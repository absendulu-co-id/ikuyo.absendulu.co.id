import { useState, useRef, useMemo } from "react";
import generatePDF from 'react-to-pdf';
import { 
    Button,
    Card, 
    CardBody, 
    Spinner,
    Switch,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {
    ChevronDoubleDownIcon,
    FolderArrowDownIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/solid";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toRupiah } from "@/utils/general";
import { BLACKLISTIMAGE, WHITELISTIMAGE } from "@/utils/general";
import { postGeneratePayroll, postDownloadPayroll } from "@/app/services/payroll";
import { isEmpty } from "@/utils/locDash";
import { postUploadIcon } from "@/app/services/file";
import { snackBar } from "@/utils/snackbar";
import ShimmerEmployee from "@/app/pages/payroll/components/EmployeePayroll/Shimmer";
import { NoData } from "@/app/components";
import FileSaver from 'file-saver';

interface keyable {
    [key: string]: any;
}

interface IMultiValuePayroll {
    label: string;
    value: string;
}

const mockData = [
    {
        "companyId": "af5f1605-f757-401a-a578-3e444fdd354e",
        "departmentId": "6096adf7-d5f9-4adb-aa67-5826232a8a91",
        "departmentName": "FINANCE",
        "positionId": "572cee7f-a9df-4154-bad8-6ce0b80d52d2",
        "positionName": "accounting",
        "payroll": [
            {
                "employeeId": 1,
                "employeeName": "wafa",
                "bankName": "BCA",
                "bankAccount": "3457567890",
                "paymentMethod": "cash",
                "earning": 20000000,
                "properties": [
                    {
                        "name": "Tunjangan Jabatan",
                        "amount": 10000
                    },
                    {
                        "name": "Tunjangan Makan",
                        "amount": 20000
                    },
                    {
                        "name": "Tunjangan Tranportasi",
                        "amount": 30000
                    }
                ],
                "deductions": [
                    {
                        "name": "Ketidakhadiran",
                        "amount": 320000
                    },
                    {
                        "name": "Terlambat",
                        "amount": 150000
                    }
                ]
            },
        ]
    },
    {
        "companyId": "af5f1605-f757-401a-a578-3e444fdd354e",
        "departmentId": "6096adf7-d5f9-4adb-aa67-5826232a8a91",
        "departmentName": "FINANCE",
        "positionId": "572cee7f-a9df-4154-bad8-6ce0b80d52d2",
        "positionName": "accounting",
        "payroll": [
            {
                "employeeId": 1,
                "employeeName": "wafa",
                "bankName": "BCA",
                "bankAccount": "3457567890",
                "paymentMethod": "cash",
                "earning": 20000000,
                "properties": [
                    {
                        "name": "Tunjangan Jabatan",
                        "amount": 10000
                    },
                    {
                        "name": "Tunjangan Makan",
                        "amount": 20000
                    },
                    {
                        "name": "Tunjangan Tranportasi",
                        "amount": 30000
                    }
                ],
                "deductions": [
                    {
                        "name": "Ketidakhadiran",
                        "amount": 320000
                    },
                    {
                        "name": "Terlambat",
                        "amount": 150000
                    }
                ]
            },
        ]
    },
    {
        "companyId": "af5f1605-f757-401a-a578-3e444fdd354e",
        "departmentId": "6096adf7-d5f9-4adb-aa67-5826232a8a91",
        "departmentName": "FINANCE",
        "positionId": "572cee7f-a9df-4154-bad8-6ce0b80d52d2",
        "positionName": "accounting",
        "payroll": [
            {
                "employeeId": 1,
                "employeeName": "wafa",
                "bankName": "BCA",
                "bankAccount": "3457567890",
                "paymentMethod": "cash",
                "earning": 20000000,
                "properties": [
                    {
                        "name": "Tunjangan Jabatan",
                        "amount": 10000
                    },
                    {
                        "name": "Tunjangan Makan",
                        "amount": 20000
                    },
                    {
                        "name": "Tunjangan Tranportasi",
                        "amount": 30000
                    }
                ],
                "deductions": [
                    {
                        "name": "Ketidakhadiran",
                        "amount": 320000
                    },
                    {
                        "name": "Terlambat",
                        "amount": 150000
                    }
                ]
            },
        ]
    },
    {
        "companyId": "af5f1605-f757-401a-a578-3e444fdd354e",
        "departmentId": "6096adf7-d5f9-4adb-aa67-5826232a8a91",
        "departmentName": "FINANCE",
        "positionId": "572cee7f-a9df-4154-bad8-6ce0b80d52d2",
        "positionName": "accounting",
        "payroll": [
            {
                "employeeId": 1,
                "employeeName": "wafa",
                "bankName": "BCA",
                "bankAccount": "3457567890",
                "paymentMethod": "cash",
                "earning": 20000000,
                "properties": [
                    {
                        "name": "Tunjangan Jabatan",
                        "amount": 10000
                    },
                    {
                        "name": "Tunjangan Makan",
                        "amount": 20000
                    },
                    {
                        "name": "Tunjangan Tranportasi",
                        "amount": 30000
                    }
                ],
                "deductions": [
                    {
                        "name": "Ketidakhadiran",
                        "amount": 320000
                    },
                    {
                        "name": "Terlambat",
                        "amount": 150000
                    }
                ]
            },
        ]
    }
]

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


export default function EmployeePayroll ({ payrollOpt, isLoadingPayroll, allPayrollIds }) {
  const fileReader = new FileReader();

  const hiddleFileInput = useRef<HTMLInputElement | null>(null);
  const targetRef = useRef();
  
  const downloadPDF = () => {
    generatePDF(targetRef, {filename: 'page.pdf'})
  }

  const animatedComponents = makeAnimated();
  const decodedToken = localStorage.getItem('decoded');
  const decoded = JSON.parse(decodedToken || '');

  const SelectProps = {
    components: animatedComponents,
    className: 'text-sm',
    isClearable: false,
    styles: customStyles,
}

  const [data, setData] = useState<Array<Object>>([]);
  const [payrollIds, setPayrollIds] = useState<Array<string>>([]);
  const [previewPayroll, setPreviewPayroll] = useState<boolean>(false);
  const defaultImgPreview = decoded?.icon_url;
  const [image, setImage] = useState<keyable>(
    { preview: '', raw: '' }
  );
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [errorUpload, setErrorUpload] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaveUpload, setIsSaveUpload] = useState<boolean>(false)
  const [isLoadingDownload, setIsLoadingDownload] = useState<boolean>(false);

  const [isAllId, setIsAllId] = useState<boolean>(false);
  const [multiValuePayroll, setMultiValuePayroll] = useState<IMultiValuePayroll[]>([]);

  const [isLoadingSend, setIsLoadingSend] = useState<boolean>(false);

  const handleSend = () => {
    console.log('handleSend');
  }

  const handleSwitch = (event) => {
    const checked = event.target.checked;
    setIsAllId(checked);
    if (checked) {
        setPayrollIds(allPayrollIds);
        setMultiValuePayroll(payrollOpt)
    } else {
        setPayrollIds([]);
        setMultiValuePayroll([]);
    }
  }

  const handleClickUpload = () => {
    hiddleFileInput.current?.click();
  };

  const handleChangeImage = (event) => {
    const files = event.target.files[0];
 
    if (files) {
        const imageSize = Number((files.size / 1024 / 1024).toFixed(2));
        const maxSize = 2; // in Mega Byte

        if (imageSize < maxSize) {
            if (errorUpload?.length > 1) {
                setErrorUpload("");
            }

            fileReader.onloadend = function (e: any) {
                const arr = new Uint8Array(e.target.result as ArrayBufferLike).subarray(0, 4);

                let header = "";

                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }

                if (!BLACKLISTIMAGE.includes(header)) {
                    if (WHITELISTIMAGE.includes(header)) {
                        setImage({
                            preview: URL.createObjectURL(files),
                            raw: files
                        })
                        setIsSaveUpload(true)
                    }
                } else {
                    setErrorUpload("Image file type allowed: .JPG, .JPEG, dan .PNG");
                }
            }
            fileReader.readAsArrayBuffer(files);
        } else {
            setErrorUpload("Make sure image file size up to 2 MB");
        }
    }

  }

  const handleGenerate = async () => {
    setIsLoading(true);

    try {
        const response = await postGeneratePayroll(payrollIds);
        setData(response?.data);
        setPreviewPayroll(true);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
    } finally {
        setIsLoading(false);
    }
  }

  const handleDownload = async () => {
    setIsLoadingDownload(true);

    try {
        const response = await postDownloadPayroll(payrollIds);
        const blob = new Blob([response], {
            type: 'application/octet-stream'
          })
        const filename = 'download.zip';
        FileSaver.saveAs(blob, filename)
        
    } catch (err) {
        setIsLoadingDownload(false);
    } finally {
        setIsLoadingDownload(false);
    }
  }

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append('file', image?.raw);
    setIsLoadingUpload(true);
    try {
        const response = await postUploadIcon(formData, true);

        if (response && response?.message === "Success") {
            snackBar("success", "Upload company logo success")
            setIsLoadingUpload(false)
            setIsSaveUpload(false)
        }
        setIsLoadingUpload(false)
        setIsSaveUpload(false)
    } catch (err) {
        setIsLoadingUpload(false)
        snackBar("error", "Upload company logo failed")
        setIsSaveUpload(false)
    }
  }

  return (
    <>  
        {isLoadingPayroll ? (
            <ShimmerEmployee />
        ) : (
        <div className="flex flex-col w-full px-16 pt-16 pb-10">
            <div className="flex flex-row gap-2">
                <div className="w-full">
                    <Select
                        isMulti
                        onChange={(selected) => {
                            setPayrollIds(selected.map(({ value }: any) => value));
                            setMultiValuePayroll([...selected]);
                        }}
                        value={multiValuePayroll}

                        options={payrollOpt}
                        placeholder={<Typography variant="small" className="text-green-500 font-normal">Select Position to Preview Payroll ...</Typography>}
                        {...SelectProps}
                    />
                </div>            
                <Button
                    disabled={isLoading || isEmpty(payrollIds)}
                    variant="filled"
                    color={'amber'}
                    className={'p-2 ml-4 flex mb-4 justify-center w-40' }
                    onClick={handleGenerate}
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
                                <Spinner color="amber" className="h-4 w-4 mr-2 mt-0.5" />
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="small"
                                    className="font-bold uppercase text-white "
                                >
                                    {'Preview'}
                                </Typography>
                                <ChevronDoubleDownIcon strokeWidth={5} className="h-4 w-4" color="white" />
                            </>
                        )}

                    </div>
                </Button>
                <Button
                    disabled={isLoadingDownload || isEmpty(data)}
                    variant="filled"
                    color={'blue'}
                    className={'p-2 ml-4 flex mb-4 justify-center w-40' }
                    onClick={handleDownload}
                >   
                    <div className="flex flex-row gap-2 items-center">
                        {isLoadingDownload ? (
                            <>
                                <Typography
                                    variant="small"
                                    className="font-bold uppercase text-white text-center"
                                >
                                    {'Loading'}
                                </Typography>
                                <Spinner color="blue" className="h-4 w-4 mr-2 mt-0.5"/>
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="small"
                                    className="font-bold uppercase text-white "
                                >
                                    {'Download'}
                                </Typography>
                                <FolderArrowDownIcon strokeWidth={5} className="h-4 w-4" />
                            </>
                        )}
                    </div>
                </Button>
                <Button
                    disabled={isLoadingSend || isEmpty(data)}
                    variant="filled"
                    color={'green'}
                    className={'p-2 ml-4 flex mb-4 justify-center w-40' }
                    onClick={handleSend}
                >   
                    <div className="flex flex-row gap-2 items-center">
                        {isLoadingSend ? (
                            <>
                                <Typography
                                    variant="small"
                                    className="font-bold uppercase text-white text-center"
                                >
                                    {'Loading'}
                                </Typography>
                                <Spinner color="green" className="h-4 w-4 mr-2 mt-0.5"/>
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="small"
                                    className="font-bold uppercase text-white "
                                >
                                    {'Send All'}
                                </Typography>
                                <EnvelopeIcon strokeWidth={5} className="h-4 w-4" color="white" />
                            </>
                        )}
                    </div>
                </Button>

            </div>
            
            <div>
                <Switch
                    label={isAllId ? "All Position" : "Single/ Multi Position"}
                    crossOrigin={undefined}
                    color="green"
                    onClick={handleSwitch}
                />
            </div>
        </div>

        )}

        {previewPayroll && (
            <Card
                className={'mt-2'}
            >
                <CardBody className="flex flex-col px-16">
                    <div className="flex flex-row justify-between mb-10">
                        <Typography color={'green'} variant={'h4'}>
                            Employee Payroll
                        </Typography>
                        <div className="flex flex-col items-end">
                            <Tooltip
                                content={<Typography color="white" className="text-xs">
                                    Click to change company logo
                                </Typography>}
                            >
                                <div
                                    data-testid="container-image"
                                    className="relative h-10"
                                    onClick={handleClickUpload}
                                >
                                    <img
                                        src={image.preview || defaultImgPreview}
                                        className="h-full cursor-pointer" 
                                        />
                                    <input
                                        accept="image/x-png, image/jpg, image/jpeg, image/png"
                                        type="file"
                                        onChange={handleChangeImage}
                                        ref={hiddleFileInput}
                                        className="hidden"
                                    />

                                        {isLoadingUpload && (
                                            <div style={{ fontSize: '9px'}} className="rounded-full border-none text-white bg-opacity-30 w-full h-full cursor-pointer absolute top-0">
                                                <div className="flex justify-center items-center h-full text-center">
                                                    {/* <ArrowUpCircleIcon className="w-10 h-10 cursor-pointer text-gray-700 text-opacity-50 font-bold" /> */}
                                                    <Spinner color="green" className="h-4 w-4 mr-2 mt-0.5" />
                                                </div>
                                            </div>
                                        )}

                                </div>
                            </Tooltip>
                            
                            {isSaveUpload && <div onClick={handleUploadImage} className="mt-1 text-xs text-center cursor-pointer w-full hover:bg-green-500 hover:rounded-md hover:text-white">Save</div>}
                            
                            <div className="text-center">
                                <Typography variant="small" color="red">
                                    {errorUpload}
                                </Typography>
                            </div>


                        </div>
                    </div>


                    {data && data.length > 0 ? data?.map((list: keyable, indexData: number) => {
                        
                        return (
                            <div key={`employeePayroll-${indexData}`} className="flex flex-col border-2 border-black border-dotted p-4 mb-4">
                            <div className="flex flex-row justify-between flex-wrap mb-4">
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-60">Department Name</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{list.departmentName}</div>
                                </div>
                                <div className="flex flex-row justify-start gap-5">
                                    <div className="font-bold w-60">Position Name</div>
                                    <div className="w-40 pl-2 border-l-4 border-green-500">{list.positionName}</div>
                                </div>

                            </div>

                            <div className="mb-7">
                                {list.payroll.map((payroll: keyable, indexPayroll: number) => (
                                    <>
                                        <div className="font-bold my-4 text-green-500 text-xl border-t-2 border-dashed border-black pt-5">Detail Employee</div>
                                        <div key={`payroll-${indexPayroll}`} className="flex flex-row justify-between flex-wrap gap-2">
                                            <div className="flex flex-row justify-start gap-5">
                                                <div className="font-bold w-60">Employee Name</div>
                                                <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.employeeName}</div>
                                            </div>
                                            <div className="flex flex-row justify-start gap-5">
                                                <div className="font-bold w-60">Employee ID</div>
                                                <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.employeeId}</div>
                                            </div>
                                            <div className="flex flex-row justify-start gap-5">
                                                <div className="font-bold w-60">Bank Name</div>
                                                <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.bankName}</div>
                                            </div>
                                            <div className="flex flex-row justify-start gap-5">
                                                <div className="font-bold w-60">Bank Account</div>
                                                <div className="w-40 pl-2 border-l-4 border-green-500">{payroll.bankAccount}</div>
                                            </div>
                                            <div className="flex flex-row justify-start gap-5">
                                                <div className="font-bold w-60">Salary</div>
                                                <div className="w-40 pl-2 border-l-4 border-green-500">{toRupiah(payroll.earning)}</div>
                                            </div>
                                        </div>

                                        <div className="font-bold my-4 text-green-500 text-xl">Income</div>
                                            <div className="flex flex-row justify-between flex-wrap gap-2">
                                                {payroll.properties.map((income: keyable, indexIncome: number) => (
                                                    <div key={`income-${indexIncome}`} className="flex flex-row justify-start gap-5">
                                                        <div className="font-bold w-60">{income.name}</div>
                                                        <div className="w-40 pl-2 border-l-4 border-green-500">{toRupiah(income.amount)}</div>
                                                    </div>
                                                ))}
                                        </div>

                                        <div className="font-bold my-4 text-green-500 text-xl">Deduction</div>
                                            <div className="flex flex-row justify-between flex-wrap gap-2">
                                                {payroll.deductions.map((deduction: keyable, indexDeduction: number) => (
                                                    <div key={`income-${indexDeduction}`} className="flex flex-row justify-start gap-5">
                                                        <div className="font-bold w-60">{deduction.name}</div>
                                                        <div className="w-40 pl-2 border-l-4 border-green-500">{toRupiah(deduction.amount)}</div>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                ))}
                            </div>

                        

                        
                        </div>
                        )
                    }) : (<NoData />)}
                </CardBody>
            </Card>
        )}

    
    </>
  );
}
