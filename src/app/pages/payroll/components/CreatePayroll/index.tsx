import { useEffect, useState } from "react";
import {
    PlusIcon,
    TrashIcon,
    PlusCircleIcon,
    PaperAirplaneIcon,
    ChevronDownIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Button,
    Card,
    CardBody,
    Chip,
    Input,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import { GetPositionResponse } from "@/interface/company";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getDataPosition } from "@/app/services/company/position";
import { postDataPayroll, updateDataPayroll } from "@/app/services/payroll";
import {
    colorName,
    getRandomVal,
    handleInputNumberRupiah
} from "@/utils/general";
import { snackBar } from "@/utils/snackbar";
import { isEmpty } from "@/utils/locDash";
import Badge from "@/app/components/molecules/Badge";
import { useSelector } from "react-redux";
import { getDataEmployee } from "@/app/services/company/employee";

interface keyable {
    [key: string]: any;
}

const CreatePayroll = ({
    getPayrollAll,
    dataEdit,
    form,
    setForm,
    properties,
    setProperties,
    setDataEdit,
    deductions,
    setDeductions,
}) => {
    const animatedComponents = makeAnimated();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [positionData, setPositionData] = useState<Array<keyable>>([]);
    const [payrollType, setPayrollType] = useState<Array<keyable>>([]);

    const defaultIncomeType = [
        {
            label: 'Tunjangan Jabatan',
            value: '1',
            mandatory: true,
            bgColor: "red",
        },
        {
            label: 'Tunjangan Pulsa',
            value: '2',
            mandatory: true,
            bgColor: "violet",
        },
        {
            label: 'Tunjangan Kehadiran',
            value: '3',
            mandatory: true,
            bgColor: "blue",
        },
        {
            label: 'Tunjangan Apresiasi',
            value: '4',
            mandatory: true,
            bgColor: "green",
        },
        {
            label: 'Tunjangan Tranportasi',
            value: '4',
            mandatory: true,
            bgColor: "amber",
        }
    ];

    const [incomeType, setIncomeType] = useState<any>(defaultIncomeType);
    const handleDeleteIncomeType = (index) => {
        let data = [...incomeType];
        data.splice(index, 1);
        setIncomeType(data);
    }

    const [incomeName, setIncomeName] = useState<string>("");
    const [incomeNameError, setIncomeNameError] = useState<boolean>(false);
    const [incomeNameErrorMsg, setIncomeNameErrorMsg] = useState<string>("Income type duplicate");
    const [openAccordion, setOpenAccordion] = useState<boolean>(true);

    const [positionError, setPositionError] = useState<boolean>(false);
    const [formError, setFormError] = useState<Array<Object>>([]);
    const [isPropertiesError, setIsPropertiesError] = useState<boolean>(false);

    const defaultDeductionType = [
        {
            label: 'Late',
            value: '1',
            mandatory: true,
            bgColor: "red",
        },
        {
            label: 'Absent',
            value: '2',
            mandatory: true,
            bgColor: "violet",
        },
        {
            label: 'BPJS Kesehatan',
            value: '3',
            mandatory: true,
            bgColor: "blue",
        },
        {
            label: 'BPJS Ketenagakerjaan',
            value: '4',
            mandatory: true,
            bgColor: "amber",
        }
    ];

    const payrollTypeSelect = [
        {
            label: 'Monthly',
            value: 'Monthly',
        },
        {
            label: 'Daily',
            value: 'Daily',
        },
    ];
    const [deductionType, setDeductionType] = useState<any>(defaultDeductionType);
    const handleDeleteDeductionType = (index) => {
        let data = [...deductionType];
        data.splice(index, 1);
        setDeductionType(data);
    }

    const [deductionName, setDeductionName] = useState<string>("");
    const [deductionNameError, setDeductionNameError] = useState<boolean>(false);
    const [deductionNameErrorMsg, setDeductionNameErrorMsg] = useState<string>("Deductions type duplicate");
    const [openDeductionAccordion, setOpenDeductionAccordion] = useState<boolean>(false);

    const [formDeductionsError, setFormDeductionsError] = useState<Array<Object>>([]);
    const [isDeductionsError, setIsDeductionsError] = useState<boolean>(false);

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

    const handleAddProperties = () => {
        let newProperties = { name: "", amount: "" };
        setProperties([...properties, newProperties]);
    }

    const handleAddDeductions = () => {
        let newDeductions = { name: "", amount: "" };
        setDeductions([...deductions, newDeductions]);
    }

    const handleDeleteProperties = (index: number) => {
        let data = [...properties];
        data.splice(index, 1);
        setProperties(data);
    }

    const handleDeleteDeductions = (index: number) => {
        let data = [...deductions];
        data.splice(index, 1);
        setDeductions(data);
    }

    const handleFormChange = (index: number, event: any, type: string) => {
        let data = [...properties];

        if (type === 'amount') {
            data[index][event.target.name] = handleInputNumberRupiah(event.target.value);
        } else if (type === 'dropdown') {
            data[index].name = event.label;
        }

        setProperties(data);
    }

    const handleFormDeductionChange = (index: number, event: any, type: string) => {
        let data = [...deductions];

        if (type === 'amount') {
            data[index][event.target.name] = handleInputNumberRupiah(event.target.value);
        } else if (type === 'dropdown') {
            data[index].name = event.label;
        }

        setDeductions(data);
    }

    const mapIncomeType = incomeType.map((item: { label: string; }) => {
        return item.label.toLowerCase();
    });

    const handleChangeInputType = (event: any) => {
        setIncomeName(event.target.value);

        const hasSameIncomeName = mapIncomeType.includes(event.target.value.toLowerCase());
        if (hasSameIncomeName) {
            setIncomeNameError(true);
            setIncomeNameErrorMsg('Income type duplicate');
        } else {
            setIncomeNameError(false)
        }
    }

    const mapDeductionType = deductionType.map((item: { label: string; }) => {
        return item.label.toLowerCase();
    });

    const handleChangeDeductionType = (event: any) => {
        setDeductionName(event.target.value);

        const hasSameDeductionName = mapDeductionType.includes(event.target.value.toLowerCase());
        if (hasSameDeductionName) {
            setDeductionNameError(true);
            setDeductionNameErrorMsg('Deduction type duplicate');
        } else {
            setDeductionNameError(false)
        }
    }

    const handleAddInputType = () => {
        let data = [...incomeType];

        let newInputType = {
            label: incomeName,
            bgColor: getRandomVal(colorName),
            value: data.length,
            mandatory: false,
        }

        if (incomeName === "" && typeof incomeName === 'string' && incomeName.length === 0) {
            setIncomeNameError(true);
            setIncomeNameErrorMsg('Please input income type');
            return
        }

        const hasSameIncomeName = mapIncomeType.includes(incomeName.toLowerCase());

        if (hasSameIncomeName) {
            return
        }

        setIncomeType([...incomeType, newInputType]);
        setIncomeName('');
    }

    const handleAddDeductionType = () => {
        let data = [...deductionType];

        let newDeductionType = {
            label: deductionName,
            bgColor: getRandomVal(colorName),
            value: data.length,
            mandatory: false,
        }

        if (deductionName === "" && typeof deductionName === 'string' && deductionName.length === 0) {
            setDeductionNameError(true);
            setDeductionNameErrorMsg('Please input deduction type');
            return
        }

        const hasSameDeductionName = mapDeductionType.includes(deductionName.toLowerCase());

        if (hasSameDeductionName) {
            return;
        }

        setDeductionType([...deductionType, newDeductionType]);
        setDeductionName('');
    }

    const getPositionAll = async () => {
        try {
            const dataAll = await getDataPosition() as GetPositionResponse;
            const mappedDataAll = dataAll.data.map((list) => {
                return { label: `${list.departmentName} - ${list.positionName}`, value: list.id }
            })
            setPositionData(mappedDataAll);
        } catch (err) {
        }
    }

    useEffect(() => {
        getPositionAll();
    }, []);

    const lastIndexProperties = properties.length - 1;
    const lastIndexDeductions = deductions.length - 1;

    const noData = form?.positionId === '' && typeof form?.positionId === 'string' && form?.positionId.length === 0 && form?.positionName === '' && typeof form?.positionName === 'string' && form?.positionName.length === 0;

    const resetValueForm = () => {
        setForm({ positionId: '', positionName: '' });
        setProperties([{ name: undefined, amount: '' }]);
        setDeductions([{ name: undefined, amount: '' }]);
        setDataEdit({});
    };

    const handleReset = () => {
        resetValueForm();
    };

    const handleSubmitPayroll = async (event: any) => {
        event.preventDefault();

        if (noData) {
            setPositionError(true);
            setIsPropertiesError(true);
            setIsDeductionsError(true);
            return;
        };

        const errorMsg = properties.map((list, index) => {
            let error = {
                errorIncomeType: '',
                errorAmount: '',
            };

            if (!list.name) {
                error.errorIncomeType = 'Income type is required';
                setIsPropertiesError(true);
            } else {
                error.errorIncomeType = '';
                setIsPropertiesError(false);
            }

            if (!list.amount) {
                error.errorAmount = 'Amount is required';
                setIsPropertiesError(true);
            } else {
                error.errorAmount = '';
                setIsPropertiesError(false);
            }

            return error;
        });

        const errorDeductionMsg = deductions.map((list, index) => {
            let error = {
                errorDeductionType: '',
                errorAmount: '',
            };

            if (!list.name) {
                error.errorDeductionType = 'Deduction type is required';
                setIsDeductionsError(true);
            } else {
                error.errorDeductionType = '';
                setIsDeductionsError(false);
            }

            if (!list.amount) {
                error.errorAmount = 'Amount is required';
                setIsDeductionsError(true);
            } else {
                error.errorAmount = '';
                setIsDeductionsError(false);
            }

            return error;
        });

        setFormError(errorMsg);
        setFormDeductionsError(errorDeductionMsg);
        if (isPropertiesError || isDeductionsError) return false;

        const newObj = properties.reduce((accumulator: any, currentValue: any) => {
            accumulator[currentValue.name] = Number(currentValue.amount.split('.').join(""));
            return accumulator;
        }, {});

        const newObjDeduction = deductions.reduce((accumulator: any, currentValue: any) => {
            accumulator[currentValue.name] = Number(currentValue.amount.split('.').join(""));
            return accumulator;
        }, {});


        const submittedForm = {
            positionId: form.positionId,
            positionName: form.positionName,
            properties: newObj,
            deductions: newObjDeduction,
            payrollType: form.payrollType
        };

        setIsLoading(true);
        try {
            const response = await postDataPayroll(submittedForm);

            if (response && response.message === "Success") {
                snackBar('success', 'Payroll saved successfully');
                resetValueForm();
                getPayrollAll();
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

    const handleSubmitEditPayroll = async (event) => {
        event.preventDefault();

        if (noData) {
            setPositionError(true);
            setIsPropertiesError(true);
            setIsDeductionsError(true);
            return
        };

        const errorMsg = properties.map((list, index) => {

            let error = {
                errorIncomeType: '',
                errorAmount: '',
            };

            if (!list.name) {
                error.errorIncomeType = 'Income type is required';
                setIsPropertiesError(true);
            } else {
                error.errorIncomeType = '';
                setIsPropertiesError(false);
            }

            if (!list.amount) {
                error.errorAmount = 'Amount is required';
                setIsPropertiesError(true);
            } else {
                error.errorAmount = '';
                setIsPropertiesError(false);
            }

            return error;
        })

        const errorDeductionMsg = deductions.map((list, index) => {
            let error = {
                errorDeductionType: '',
                errorAmount: '',
            };

            if (!list.name) {
                error.errorDeductionType = 'Deduction type is required';
                setIsDeductionsError(true);
            } else {
                error.errorDeductionType = '';
                setIsDeductionsError(false);
            }

            if (!list.amount) {
                error.errorAmount = 'Amount is required';
                setIsDeductionsError(true);
            } else {
                error.errorAmount = '';
                setIsDeductionsError(false);
            }

            return error;
        });

        setFormError(errorMsg);
        setFormDeductionsError(errorDeductionMsg);
        if (isPropertiesError || isDeductionsError) return false;

        const newObj = properties.reduce((accumulator, currentValue) => {
            accumulator[currentValue.name] = Number(currentValue.amount.split('.').join(""));
            return accumulator;
        }, {});

        const newObjDeduction = deductions.reduce((accumulator: any, currentValue: any) => {
            accumulator[currentValue.name] = Number(currentValue.amount.split('.').join(""));
            return accumulator;
        }, {});

        const submittedForm = {
            properties: newObj,
            deductions: newObjDeduction,
        };

        setIsLoading(true);
        try {
            const response = await updateDataPayroll(dataEdit?.id.toString(), submittedForm);

            if (response && response.message === "Success") {
                snackBar('success', 'Payroll edited successfully');
                resetValueForm();
                getPayrollAll();
                setDataEdit(null);
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };


    return (
        <Card className={'mt-2 mb-1 -mr-6'}>
            <CardBody>
                <Typography color={'green'} variant={'h4'}>
                    {dataEdit ? "Edit" : "Create"} Payroll Model
                </Typography>


                <div className="border border-green-400 rounded-xl mt-4 bg-gray-100">
                    <div className={'p-1 bg-green-400 rounded-tl-lg rounded-br-xl w-60'} >
                        <Typography className={'text-center'} variant={'lead'} color={'white'}>
                            {'FORM PAYROLL MODEL'}
                        </Typography>
                    </div>

                    {/* Start Input Income */}

                    <div className="flex flex-row m-4">
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
                                    Income Type Input
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody>
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-row gap-1 w-full">
                                        <div className="flex flex-col gap-1 w-full">
                                            <Input
                                                size="md"
                                                label="Income Type Input"
                                                color="green"
                                                type={'text'}
                                                error={incomeNameError}
                                                success={incomeNameError === false}
                                                crossOrigin={undefined}
                                                onChange={handleChangeInputType}
                                                value={incomeName}
                                                name="incomeName"
                                            />
                                            {incomeNameError && (
                                                <Typography variant="small" color="red">
                                                    {incomeNameErrorMsg}
                                                </Typography>
                                            )}

                                        </div>

                                        <div>
                                            <Button
                                                variant="filled"
                                                color={'green'}
                                                className={'p-2 w-20 ml-4 flex mb-4'}
                                                fullWidth
                                                onClick={handleAddInputType}
                                            >
                                                <div className="flex flex-row gap-3">
                                                    <Typography
                                                        variant="small"
                                                        className="font-bold uppercase text-white "
                                                    >
                                                        {'ADD'}
                                                    </Typography>
                                                    <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
                                                </div>
                                            </Button>

                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row gap-4 flex-wrap justify-center">
                                        {incomeType.map((list, index) => (
                                            <div key={`incomeType-${index}`} className="">
                                                {list.mandatory ? (
                                                    <Chip
                                                        value={list.label}
                                                        color={list.bgColor}
                                                        variant="outlined"
                                                    />
                                                ) : (

                                                    <Badge
                                                        content={"x"}
                                                        onClick={() => handleDeleteIncomeType(index)}
                                                    // bgColor="red"
                                                    >
                                                        <Chip
                                                            value={list.label}
                                                            color={list.bgColor}
                                                            variant="outlined"
                                                        />
                                                    </Badge>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionBody>
                        </Accordion>
                    </div>

                    {/* End Input Income Type */}

                    {/* Start properties */}
                    <div className="flex flex-col m-4 gap-4">
                        <div>
                            <Typography variant={'paragraph'} className={'mb-1.5'}>
                                Position
                            </Typography>

                            <Select
                                onChange={(selected: any) => {
                                    setForm((prevValue) => {
                                        return {
                                            ...prevValue,
                                            positionId: selected.value,
                                            positionName: selected.label,
                                        }
                                    })
                                    setPositionError(false);

                                }}
                                options={positionData}
                                value={!isEmpty(form.positionName) ? { label: form.positionName, value: form.positionId } : null}
                                placeholder={<Typography variant="small" className="text-green-500 font-normal">Select Position ...</Typography>}
                                {...SelectProps}
                            />
                            {positionError && (
                                <Typography variant="small" color="red">
                                    Please select position
                                </Typography>
                            )}
                        </div>
                        {properties.map((list, index) => {

                            return (
                                <div key={`properties-${index}`}>

                                    <div className="flex flex-row justify-between gap-4">
                                        <div className="w-full">
                                            <Typography variant={'paragraph'} className={'mb-1.5'}>
                                                Income type
                                            </Typography>

                                            <Select
                                                options={incomeType}
                                                placeholder={<Typography variant="small" className="text-green-500 font-normal">Select Income Type ...</Typography>}
                                                onChange={(event) => handleFormChange(index, event, "dropdown")}
                                                name="name"
                                                value={!isEmpty(list.name) ? {
                                                    label: list.name,
                                                    value: index + 1,
                                                } : null}
                                                {...SelectProps}
                                            />
                                            {formError.map((listError: any, indexError) => (
                                                <div key={`listError${indexError}`}>
                                                    {index === indexError && (
                                                        <Typography variant="small" color="red">
                                                            {listError.errorIncomeType}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full">
                                            <Typography variant={'paragraph'} className={'mb-1.5'}>
                                                {'Amount'}
                                            </Typography>

                                            <div className="relative flex w-full max-w-full">
                                                <Button
                                                    ripple={false}
                                                    variant="text"
                                                    color="blue-gray"
                                                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-green-500 bg-blue-gray-500/10 pl-3 w-2"
                                                >
                                                    <Typography className="text-green-500 font-normal" variant={'small'}>
                                                        Rp
                                                    </Typography>
                                                </Button>
                                                <Input
                                                    className="rounded-l-none !border-t-green-500 focus:!border-t-green-500 placeholder:text-green-500"
                                                    labelProps={{
                                                        className: "before:content-none after:content-none",
                                                    }}
                                                    containerProps={{ className: "min-w-0" }}
                                                    type={'tel'}
                                                    success
                                                    size="md"
                                                    onChange={(event) => handleFormChange(index, event, "amount")}
                                                    name="amount"
                                                    value={list.amount}
                                                    crossOrigin={undefined}
                                                    placeholder="Type amount ..."
                                                />
                                            </div>
                                            {formError.map((listError: any, indexError) => (
                                                <div key={`listError${indexError}`}>
                                                    {index === indexError && (
                                                        <Typography variant="small" color="red">
                                                            {listError.errorAmount}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-row items-center gap-2 w-36 mt-10">

                                            {properties.length > 1 && (
                                                <div className="mb-2">
                                                    <TrashIcon
                                                        onClick={() => handleDeleteProperties(index)}
                                                        className={'w-5 h-5 cursor-pointer text-red-500'}
                                                    />
                                                </div>
                                            )}

                                            {lastIndexProperties === index && (
                                                <div className="mb-2">
                                                    <PlusCircleIcon
                                                        onClick={handleAddProperties}
                                                        className={'w-5 h-5 cursor-pointer text-blue-500'}
                                                    />
                                                </div>
                                            )}


                                        </div>


                                    </div>
                                </div>
                            )
                        })}
                        <div>
                            <Typography variant={'paragraph'} className={'mb-1.5'}>
                                Payroll Type
                            </Typography>

                            <Select
                                onChange={(selected: any) => {
                                    setForm((prevValue) => {
                                        return {
                                            ...prevValue,
                                            payrollType: selected.value,
                                            payrollTypeLabel: selected.label
                                        }
                                    })
                                    setPositionError(false);

                                }}
                                options={payrollTypeSelect}
                                value={!isEmpty(form.payrollType) ? { label: form.payrollTypeLabel, value: form.payrollType } : null}
                                placeholder={<Typography variant="small" className="text-green-500 font-normal">Select Payroll Type ...</Typography>}
                                {...SelectProps}
                            />
                            {positionError && (
                                <Typography variant="small" color="red">
                                    Please select Payrol Type
                                </Typography>
                            )}
                        </div>
                        <div>
                            <div className="flex flex-col gap-1 w-full">
                                <Typography variant={'paragraph'} className={'mb-1.5'}>
                                    Employee Name
                                </Typography>
                                <Input
                                    size="md"
                                    color="green"
                                    crossOrigin={undefined}
                                    onChange={(e) => setForm((prev) => ({ ...prev, employeeName: e.target.value }))}
                                    value={form.employeeName}
                                    name="employeeName"
                                />
                                {deductionNameError && (
                                    <Typography variant="small" color="red">
                                        {deductionNameErrorMsg}
                                    </Typography>
                                )}

                            </div>
                        </div>

                    </div>
                    {/* End properties */}


                    {/* Start Input Deductions Type */}

                    <div className="flex flex-row m-4">
                        <Accordion
                            open={openDeductionAccordion}
                            icon={<ChevronDownIcon className="w-5 h-5 cursor-pointer text-green-500" />}
                        >
                            <AccordionHeader
                                onClick={() => setOpenDeductionAccordion(!openDeductionAccordion)}
                            >
                                <Typography
                                    variant="h4"
                                    className="font-bold text-green-500"
                                >
                                    Deduction Type Input
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody>
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-row gap-1 w-full">
                                        <div className="flex flex-col gap-1 w-full">
                                            <Input
                                                size="md"
                                                label="Deduction Type Input"
                                                color="green"
                                                error={deductionNameError}
                                                success={deductionNameError === false}
                                                crossOrigin={undefined}
                                                onChange={handleChangeDeductionType}
                                                value={deductionName}
                                                name="deductionName"
                                            />
                                            {deductionNameError && (
                                                <Typography variant="small" color="red">
                                                    {deductionNameErrorMsg}
                                                </Typography>
                                            )}

                                        </div>

                                        <div>
                                            <Button
                                                variant="filled"
                                                color={'green'}
                                                className={'p-2 w-20 ml-4 flex mb-4'}
                                                fullWidth
                                                onClick={handleAddDeductionType}
                                            >
                                                <div className="flex flex-row gap-3">
                                                    <Typography
                                                        variant="small"
                                                        className="font-bold uppercase text-white "
                                                    >
                                                        {'ADD'}
                                                    </Typography>
                                                    <PlusIcon strokeWidth={4} className="h-5 w-5 mr-2" />
                                                </div>
                                            </Button>

                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row gap-4 flex-wrap justify-center">
                                        {deductionType.map((list: any, index: any) => (
                                            <div key={`deductionType-${index}`} className="cursor-pointer">
                                                {list.mandatory ? (
                                                    <Chip
                                                        value={list.label}
                                                        color={list.bgColor}
                                                        variant="outlined"
                                                    />
                                                ) : (

                                                    <Badge
                                                        content={"x"}
                                                        onClick={() => handleDeleteDeductionType(index)}
                                                    // bgColor="red"
                                                    >
                                                        <Chip
                                                            value={list.label}
                                                            color={list.bgColor}
                                                            variant="outlined"
                                                        />
                                                    </Badge>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionBody>
                        </Accordion>
                    </div>

                    {/* End Input Deductions Type */}

                    {/* Start form deductions */}
                    <div className="flex flex-col m-4 gap-4">
                        {deductions.map((list: any, index: any) => {
                            return (
                                <div key={`deductions-${index}`}>

                                    <div className="flex flex-row justify-between gap-4">
                                        <div className="w-full">
                                            <Typography variant={'paragraph'} className={'mb-1.5'}>
                                                Deduction type
                                            </Typography>

                                            <Select
                                                options={deductionType}
                                                placeholder={<Typography variant="small" className="text-green-500 font-normal">Select Deduction Type ...</Typography>}
                                                onChange={(event) => handleFormDeductionChange(index, event, "dropdown")}
                                                name="name"
                                                value={!isEmpty(list.name) ? {
                                                    label: list.name,
                                                    value: index + 1,
                                                } : null}
                                                {...SelectProps}
                                            />
                                            {formDeductionsError.map((listError: any, indexError) => (
                                                <div key={`listDedeductionError${indexError}`}>
                                                    {index === indexError && (
                                                        <Typography variant="small" color="red">
                                                            {listError.errorDeductionType}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-full">
                                            <Typography variant={'paragraph'} className={'mb-1.5'}>
                                                {'Amount'}
                                            </Typography>

                                            <div className="relative flex w-full max-w-full">
                                                <Button
                                                    ripple={false}
                                                    variant="text"
                                                    color="blue-gray"
                                                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-green-500 bg-blue-gray-500/10 pl-3 w-2"
                                                >
                                                    <Typography className="text-green-500 font-normal" variant={'small'}>
                                                        Rp
                                                    </Typography>
                                                </Button>
                                                <Input
                                                    className="rounded-l-none !border-t-green-500 focus:!border-t-green-500 placeholder:text-green-500"
                                                    labelProps={{
                                                        className: "before:content-none after:content-none",
                                                    }}
                                                    containerProps={{ className: "min-w-0" }}
                                                    type={'tel'}
                                                    success
                                                    size="md"
                                                    onChange={(event) => handleFormDeductionChange(index, event, "amount")}
                                                    name="amount"
                                                    value={list.amount}
                                                    crossOrigin={undefined}
                                                    placeholder="Type amount ..."
                                                />
                                            </div>
                                            {formError.map((listError: any, indexError) => (
                                                <div key={`listDeductionError${indexError}`}>
                                                    {index === indexError && (
                                                        <Typography variant="small" color="red">
                                                            {listError.errorAmount}
                                                        </Typography>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-row items-center gap-2 w-36 mt-10">

                                            {deductions.length > 1 && (
                                                <div className="mb-2">
                                                    <TrashIcon
                                                        onClick={() => handleDeleteDeductions(index)}
                                                        className={'w-5 h-5 cursor-pointer text-red-500'}
                                                    />
                                                </div>
                                            )}

                                            {lastIndexDeductions === index && (
                                                <div className="mb-2">
                                                    <PlusCircleIcon
                                                        onClick={handleAddDeductions}
                                                        className={'w-5 h-5 cursor-pointer text-blue-500'}
                                                    />
                                                </div>
                                            )}


                                        </div>


                                    </div>
                                </div>
                            )
                        })}

                        <div className="flex flex-row justify-end items-center mt-10">
                            <Button
                                variant="filled"
                                color={'blue'}
                                className={'p-2 ml-4 flex mb-4 w-24 justify-between'}
                                onClick={handleReset}
                            >
                                <Typography
                                    variant="small"
                                    className="font-bold uppercase text-white "
                                >
                                    {'Reset'}
                                </Typography>
                                <div>
                                    <ArrowPathIcon strokeWidth={4} className="h-5 w-5" />
                                </div>
                            </Button>
                            <Button
                                disabled={isLoading}
                                variant="filled"
                                color={'green'}
                                className={'p-2 w-32 ml-4 flex mb-4 justify-center'}
                                onClick={dataEdit ? handleSubmitEditPayroll : handleSubmitPayroll}
                            >
                                <div className="flex flex-row gap-2 items-center">
                                    {isLoading ? (
                                        <>
                                            <Typography
                                                variant="small"
                                                className="font-bold uppercase text-white text-center"
                                            >
                                                {'Loading'}
                                            </Typography>
                                            <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5" />
                                        </>
                                    ) : (
                                        <>
                                            <Typography
                                                variant="small"
                                                className="font-bold uppercase text-white "
                                            >
                                                {'SAVE Model'}
                                            </Typography>
                                            <PaperAirplaneIcon strokeWidth={5} className="h-4 w-4" />
                                        </>
                                    )}

                                </div>
                            </Button>
                        </div>
                    </div>
                    {/* End form deductions */}

                </div>
            </CardBody>

        </Card>
    )
}

export default CreatePayroll;