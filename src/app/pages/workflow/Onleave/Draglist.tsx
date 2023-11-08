import { useEffect, useState, useRef } from "react";
import Select from 'react-select';
import Tour from 'reactour';
import { TourConfigInterface } from "@/interface/tour";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button,
    Card,
    CardBody,
    Typography,
    Tooltip,
    Spinner,
  } from "@material-tailwind/react";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  TrashIcon,
  PencilIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { colorName, getRandomVal } from "@/utils/general";
import { snackBar } from "@/utils/snackbar";
import { getDataDepartment } from "@/app/services/company/department";
import {
  getDataWorkflowPagination,
  getPositionByDepartment,
  postDataWorkflow,
  deleteDataWorkflow,
  updateDataWorkflow,
} from "@/app/services/workflow";
import Shimmer from "@/app/pages/workflow/Onleave/Shimmer";
import { getDataPosition } from "@/app/services/company/position";
import { GetPositionResponse } from "@/interface/company";
import { isEmpty } from "@/utils/locDash";
import { Modal } from "@/app/components";
import makeAnimated from 'react-select/animated';

interface keyable {
  [key: string]: any;
}

interface IApprovalName {
  label: string;
  value: string;
  id: number;
}

// fake data generator
const getItems = (count: number, prefix: string) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `position-${randomId}`,
      prefix,
      content: `position ${randomId}`,
      bgColor: getRandomVal(colorName),
    };
  });

const removeFromList = (list: Iterable<object> | ArrayLike<object>, index: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: Iterable<object> | ArrayLike<object>, index: number, element: any) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const lists = ["position", "requestor", "approval"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(3, listKey) }),
    {}
  );

function DragList() {
  const animatedComponents = makeAnimated();
  const scrollRef = useRef(null);
  const [elements, setElements] = useState<any>({
    position: [],
    requestor: [],
    approval: [],
  });

  const [departmentList, setDepartmentList] = useState<Array<object>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [defaultElements, setDefaultElements] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingChip, setIsLoadingChip] = useState<boolean>(false);
  const [positionData, setPositionData] = useState<Array<keyable>>([]);
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);


  const [workflowData, setWorkflowData] = useState<any>([]);
  const [isLoadingWorkFlow, setIsLoadingWorkflow] = useState<boolean>(false);

  const [isOpenWorkflowDelete, setIsOpenWorkflowDelete] = useState<boolean>(false);
  const [workflowID, setWorkFlowID] = useState<string>("");
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [isOpenWorkflowSave, setIsOpenWorkflowSave] = useState<boolean>(false);

  const initialTourConfig = [
    {
      selector: '[data-tut="reactour__workflow_droppable_position"]',
      content: 'Here you can drag & drop the position',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour__workflow_droppable_requestor"]',
      content: 'Here you can drag & drop the requestor',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour__workflow_droppable_approval"]',
      content: 'Here you can drag & drop the approver',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour__workflow_droppable_save"]',
      content: 'Then you can save here',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour__workflow_droppable_reset"]',
      content: 'If you are not sure, can reset here',
      isRead: false,
    },
    {
      selector: '[data-tut="reactour__workflow_droppable_all"]',
      content: 'After save, you can find saved workflow here',
      isRead: false,
    },
  ];

  const pathUrl = document.location.href.split('/');

  const [isTourOpen, setIsTourOpen] = useState<string | null | boolean>(localStorage.getItem(`play-tour-${pathUrl.at(3)}`));
  const [tourConfig, setTourConfig] = useState<TourConfigInterface[]>(initialTourConfig);

  const handleCloseTour = () => {
    localStorage.setItem(`play-tour-${pathUrl.at(3)}`, 'false');
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const [approvalName, setApprovalName] = useState<IApprovalName | null>(null);

  const handleChangeApproval = (event) => {
    setApprovalName(event);
  }

  const onDragEnd = (result) => {

    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];

    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  const handleReset = () => {
    setElements(defaultElements as any);
    setWorkFlowID("");
    setIsEdit(false);
    setApprovalName(null);
    snackBar('success', 'Data workflow reset succesfully');
  }

  const getWorkflowAll = async () => {
    setIsLoadingWorkflow(true);
    try {
      const response = await getDataWorkflowPagination({ pageSize: 9999 });
      
      if (!isEmpty(response?.data)) {
        setWorkflowData(response?.data);
        setIsLoadingWorkflow(false);
      }

    } catch (err) {
      
      setIsLoadingWorkflow(false);
    } finally {
      setIsLoadingWorkflow(false);
    }
  }

  const handleDeleteWorkflow = (id: string) => {
    setWorkFlowID(id);
    setIsOpenWorkflowDelete(true);
  }

  const handleEditWorkflow = (object: any) => {
    
    setIsEdit(true);
    setWorkFlowID(object.id);

    const approver = object?.approver?.reduce((acc: any, curr: any, index: number) => {
      acc.push({
        id: String(index),
        positionName: curr.positionName,
        positionCode: curr.positionCode,
        departmentName: curr.departmentName,
        departmentCode: curr.departmentCode,
        bgColor: getRandomVal(colorName),
        content: `${curr.departmentName} - ${curr.positionName}`,
        prefix: "position",
      })

      return acc;
    }, []);

    const requestor = [{
      id: object.positionId,
      prefix: "position",
      content: `${object.departmentName} - ${object.positionName}`,
      bgColor: getRandomVal(colorName),
      positionName: object.positionName,
      positionCode: object.positionCode,
      positionId: object.positionId,
      departmentName: object.departmentName,
      departmentCode: object.departmentCode,
      departmentId: object.departmentId,
    }];

    const combinedArray = requestor.concat(approver);

    const idDeletedArray = combinedArray.map((list) => list.positionCode);
    const position = positionData.filter(item => !idDeletedArray.includes(item.positionCode));

    
    setElements({
      position,
      requestor,
      approval: approver,
    })
    
    setApprovalName({
      label: object.approvalName,
      value: object.approvalName,
      id: object.id,
    })

    scrollToTop();
  }

  const handleOkDeleteWorkflow = async () => {
    setIsLoadingDelete(true);
    try {
      const response = await deleteDataWorkflow(workflowID);
      

      if (!isEmpty(response?.data)) {
        setIsLoadingDelete(false);
        setIsOpenWorkflowDelete(false);
        getWorkflowAll();
      }
      
    } catch (err) {
      
      setIsLoadingDelete(false);
    } finally {
      setIsLoadingDelete(false);
    }
  }

  const handleSave = async () => {
    const { requestor, approval } = elements;

    const approver = approval?.map((list: any) => {
      
      return {
        positionName: list.positionName,
        positionCode: list.positionCode,
        departmentCode: list.departmentCode,
        departmentName: list.departmentName,
      }
    })

    
    if (requestor.length === 0) {
      snackBar('warn', 'Requester need to be minimal one person');
    }

    const payload = {
      positionCode: requestor[0]?.positionCode,
      positionName: requestor[0]?.positionName,
      positionId: requestor[0].positionId,
      departmentCode: requestor[0]?.departmentCode,
      departmentName: requestor[0]?.departmentName,
      departmentId: requestor[0]?.departmentId,
      approver,
      approvalName: approvalName?.value,
    };

    if (requestor.length === 0) {
      snackBar('warn', `Requester need to be minimal one person`);
    } else if (requestor.length > 1) {
        snackBar('warn', `Requester can only one person`);
    } else {
        setIsLoadingSave(true);
        try {
          const response = await postDataWorkflow(payload);
          
          if (response?.message === "Success") {
            setElements(defaultElements)
            setIsLoadingSave(false);
            snackBar('success', 'Data workflow saved succesfully');
            getWorkflowAll();
            setWorkFlowID("");
            setApprovalName(null);
          }

        } catch (err) {
          setIsLoadingSave(false);
        } finally {
          setIsLoadingSave(false);
          setIsOpenWorkflowSave(false);
        }
    }
  }

  const handleSaveEdit = async () => {
    const { requestor, approval } = elements;

    const approver = approval?.map((list: any) => {
      
      return {
        positionName: list.positionName,
        positionCode: list.positionCode,
        departmentCode: list.departmentCode,
        departmentName: list.departmentName,
      }
    })

    const payload = {
      positionCode: requestor[0]?.positionCode,
      positionName: requestor[0]?.positionName,
      positionId: requestor[0].positionId,
      departmentCode: requestor[0]?.departmentCode,
      departmentName: requestor[0]?.departmentName,
      departmentId: requestor[0]?.departmentId,
      approver,
      approvalName: approvalName?.value,
    };

    setIsLoadingSave(true);
    try {
      const response = await updateDataWorkflow(workflowID, payload);
      

      if (response?.message === "Success") {
        setElements(defaultElements)
        setIsLoadingSave(false);
        snackBar('success', 'Data workflow edited succesfully');
        getWorkflowAll();
        setWorkFlowID("")
        setIsEdit(false);
        setApprovalName(null);
      }

    } catch (err) {
      
      setIsLoadingSave(false);
      setIsEdit(false);
    } finally {
      setIsLoadingSave(false);
      setIsEdit(false);
      setIsOpenWorkflowSave(false);
    }

  }

  const requestorLength = elements?.requestor?.length > 1;

  const getPositionAll = async () => {
    setIsLoading(true);

    try {
        const dataAll = await getDataPosition() as GetPositionResponse;
        
        const mappedDataPosition = dataAll.data.map((list) => {
            return {
              id: list.id,
              prefix: "position",
              content: `${list.departmentName} - ${list.positionName}`,
              bgColor: getRandomVal(colorName),
              positionName: list.positionName,
              positionCode: list.positionCode,
              positionId: list.id,
              departmentName: list.departmentName,
              departmentCode: list.departmentCode,
              departmentId: list.departmentId,
            }
        })
        const initElements = {
          requestor: [],
          approval: [],
          position: mappedDataPosition,
        }
        setPositionData(mappedDataPosition);
        setDefaultElements(initElements);
        setElements(initElements as any);
        setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      snackBar('error', 'Oops, have a trouble');
    } finally {
      setIsLoading(false);
    }
  }

  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: "rgb(245 245 245)",
      // match with the menu
      borderRadius: "5px",
      // Overwrittes the different states of border
      borderColor: "rgb(102 187 106)",
      // Removes weird border around container
      boxShadow: null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "rgb(76 175 80)"
      }
    }),
    menu: (base: any) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: (base: any) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      maxHeight: '140px',
    }),
    option: (base: any, state: { isFocused: any; }) => ({
        ...base,
        backgroundColor: state.isFocused ? "rgb(76 175 80)" : "white",
        color: state.isFocused ? "white" : "rgb(69 90 100)",
    })
  };
  
  const SelectProps = {
    components: animatedComponents,
    className: 'text-sm',
    isClearable: false,
    styles: customStyles,
  }

  const approvalOpt = [
    {
      id: 1,
      label: "Leave",
      value: "Leave",
    },
    {
      id: 2,
      label: "Reimburse",
      value: "Reimburse",
    },
    {
      id: 3,
      label: "WorkShop",
      value: "WorkShop",
    },
    {
      id: 4,
      label: "Overtime",
      value: "Overtime",
    },
    {
      id: 5,
      label: "Shift",
      value: "Shift",
    },
  ];

  useEffect(() => {
    getPositionAll();
    getWorkflowAll();
  }, []);

  return (
    <>
      {isLoading ? (
        <Shimmer />
      ) : (
        <>
          <div className="ml-6">
            <Typography variant="small" color="red">
              *Note: Requester can only one person
            </Typography>
          </div>
          <div className="p-4 rounded-lg border-solid border-amber-200 bg-white" ref={scrollRef}>
              <div className="bg-gray-100 rounded-md p-3 mb-4">
                <div className="uppercase bg-green-500 text-white p-2 rounded-lg my-4 text-sm text-center">
                  <Typography
                    variant="small"
                    className="font-bold uppercase text-white"
                  >
                    Approval Name
                  </Typography>
                </div>
                <Select
                  options={approvalOpt}
                  placeholder={<Typography variant="small" className="text-green-500 font-normal">Select Approval Name ...</Typography>}
                  onChange={handleChangeApproval}
                  value={approvalName}
                  {...SelectProps}
                />
              
              </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-wrap gap-y-4 justify-between">
              {lists.map((listKey) => {
                const isDragDisabled = isEdit && listKey === 'requestor' && !isEmpty(elements[listKey]);

                let isDropDisabled = {
                  approval: false,
                  requestor: false,
                  position: false,
                };

                if (elements?.requestor?.length === 0 && listKey === 'approval') {
                  isDropDisabled = {
                    approval: true,
                    requestor: false,
                    position: false,
                  }
                }

                if (elements?.requestor?.length > 0 && listKey === 'requestor') {
                  isDropDisabled = {
                    approval: false,
                    requestor: true,
                    position: false,
                  }
                }


                return (
                    <DraggableElement
                      isLoadingChip={isLoadingChip}
                      titleCard={listKey}
                      elements={elements[listKey]}
                      key={listKey}
                      prefix={listKey}
                      style={listKey === 'position' ? { flexBasis: '100%', minHeight: '150px' } : { flexBasis: '49%'}}
                      isDragDisabled={isDragDisabled}
                      isDropDisabled={isDropDisabled[listKey]}
                  />
                )})}
              </div>
              {requestorLength && (
                <Typography color="red" variant="small" className="mt-2">Requester can only one person</Typography>
              )}
            </DragDropContext>

            <div className="flex flex-row my-6 justify-center mr-4">
              <Button
                  data-tut="reactour__workflow_droppable_save"
                  variant="filled"
                  color={'green'}
                  className={'p-2 w-20 ml-4 flex mb-4' }
                  disabled={isEmpty(elements?.requestor) || isEmpty(elements?.approval)}
                  onClick={() => setIsOpenWorkflowSave(true)}
              >
                  <InboxArrowDownIcon strokeWidth={4} className="h-5 w-5 mr-2" />
                  <Typography
                      variant="small"
                      className="font-bold uppercase text-white "
                      >
                      {'Save'}
                  </Typography>
              </Button>

              <Button
                  data-tut="reactour__workflow_droppable_reset"
                  variant="filled"
                  color={'blue'}
                  className={'p-2 w-20 ml-4 flex mb-4' }
                  onClick={handleReset}
              >
                  <ArrowPathIcon strokeWidth={4} className="h-5 w-5 mr-2" />
                  <Typography
                      variant="small"
                      className="font-bold uppercase text-white "
                      >
                      {'Reset'}
                  </Typography>
              </Button>
            </div>
          </div>

        </>
      )}

      <div className="flex flex-row m-4" data-tut="reactour__workflow_droppable_all">
        <Accordion
            open={openAccordion}
            icon={<ChevronDownIcon className="w-5 h-5 cursor-pointer text-green-500" />}
        >
            <AccordionHeader
                onClick={() => setOpenAccordion(!openAccordion)}
            >
                <Typography
                    variant="h4"
                    className="font-bold text-green-500"
                >
                    All Workflow
                </Typography>
            </AccordionHeader>
            <AccordionBody>
              <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-2 xs:grid-cols-1">
                {isLoadingWorkFlow ? (<p>Loading</p>) : 
                  !isEmpty(workflowData) ? 
                  workflowData.map((list: any, index: number) => {
                    return (
                      <Card className={'max-h-50'} key={`workflow-data-${index}`}>
                          <div className={'p-1 bg-green-400 rounded-tl-lg rounded-br-xl w-20'} >
                              <Typography className={'text-center'} variant={'small'} color={'white'}>
                                  {list.approvalName}
                              </Typography>
                          </div>
                        <CardBody className="px-3 md:px-5" >
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                              <Typography variant="small" className="text-gray-500 text-center">Department</Typography>
                              <Typography variant="h4" className="text-black text-center">{list.departmentName}</Typography>
                            </div>
                            <div className="flex flex-col">
                              <Typography variant="small" className="text-gray-500 text-center">Position</Typography>
                              <Typography variant="h4" className="text-black text-center">{list.positionName}</Typography>
                            </div>
                            <div className="h-[1px] w-full bg-gray-200"></div>
                            <div className="flex flex-row gap-1 justify-around">
                              <Tooltip content={
                                <ol className="list-decimal p-2">
                                  Approver: {list.approver.map((listApprover: any, indexApprover: number) => {
                                    const approverName = `${listApprover.positionName} - ${listApprover.departmentName}`;
                                    
                                    return (
                                      <li key={`list-approver-${indexApprover}`}>
                                        {approverName}
                                      </li>
                                    )
                                  })}
                                </ol>
                              }>
                                <InformationCircleIcon
                                  className='w-4 h-4 cursor-pointer text-blue-500' 
                                />
                              </Tooltip>
                              <Tooltip content="Edit">
                                <PencilIcon 
                                  className='w-4 h-4 cursor-pointer text-green-500'
                                  onClick={() => handleEditWorkflow(list)}
                                />
                              </Tooltip>
                              <Tooltip content="Delete">
                                <TrashIcon
                                  className='w-4 h-4 cursor-pointer text-red-500'
                                  onClick={() => handleDeleteWorkflow(list.id)} 
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    )
                  }) : (<p>No data</p>)
                }
                
              </div>
            </AccordionBody>
        </Accordion>
      </div>

      <Modal
        open={isOpenWorkflowDelete}
        header={"Delete Workflow"}
        handleClose={() => setIsOpenWorkflowDelete(false)}
        body={<div>
          Are you sure want to delete this workflow ?
        </div>}
        footer={
          <div className="flex flex-row-reverse">
          <Button
             disabled={isLoadingDelete}
             variant="filled"
             color={'red'}
             className={'p-2 w-28 ml-4 mb-4 content-center'}
             onClick={() => handleOkDeleteWorkflow()}
          >
             {isLoadingDelete ? (
                <div className="flex justify-center">
                   <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                </div>

             ) : (
                <Typography
                   variant="small"
                   className="font-bold uppercase text-white text-center"
                >
                   {'Delete'}
                </Typography>
             )}
          </Button>
          <Button
             disabled={isLoadingDelete}
             variant="filled"
             color={'green'}
             className={'p-2 w-28 ml-4 mb-4 content-center	'}
             onClick={() => setIsOpenWorkflowDelete(false)}
          >
             <Typography
                variant="small"
                className="font-bold uppercase text-white text-center"
             >
                {'Cancel'}
             </Typography>
          </Button>
       </div>
        }
        
      />

      <Modal
        open={isOpenWorkflowSave}
        header={"Save Workflow"}
        handleClose={() => setIsOpenWorkflowSave(false)}
        body={<div>
          Are you sure want to save this workflow ?
        </div>}
        footer={
          <div className="flex flex-row-reverse">
          <Button
             disabled={isLoadingSave}
             variant="filled"
             color={'red'}
             className={'p-2 w-28 ml-4 mb-4 content-center'}
             onClick={isEdit ? handleSaveEdit : handleSave}
          >
             {isLoadingSave ? (
                <div className="flex justify-center">
                   <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                </div>

             ) : (
                <Typography
                   variant="small"
                   className="font-bold uppercase text-white text-center"
                >
                   {'Save'}
                </Typography>
             )}
          </Button>
          <Button
             disabled={isLoadingSave}
             variant="filled"
             color={'green'}
             className={'p-2 w-28 ml-4 mb-4 content-center'}
             onClick={() => setIsOpenWorkflowSave(false)}
          >
             <Typography
                variant="small"
                className="font-bold uppercase text-white text-center"
             >
                {'Cancel'}
             </Typography>
          </Button>
       </div>
        }
        
      />

      <Tour 
        lastStepNextButton={<p onClick={handleCloseTour}>Done! Let's start exploring another menu !</p>}
        accentColor={"#57af5b"}
        rounded={5}
        isOpen={isTourOpen === 'true'}
        steps={tourConfig}
        onRequestClose={() => {
          setIsTourOpen(false);
        }}
      />
    </>
  );
}

export default DragList;
