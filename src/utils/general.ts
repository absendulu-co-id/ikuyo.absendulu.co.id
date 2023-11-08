import { isEmpty } from "@/utils/locDash";

export function downloadFile (response: any) {
    const url = window.URL.createObjectURL(new Blob([response?.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
}

export function toRupiah(value: string) {
    return  `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

export const colorName = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
];

export const colorNumber = [
    500,
    600,
    700,
    800,
    900,
    950,
]

export const getRandomVal = (array) => {
    return array[(Math.random() * array.length) | 0];
}

export const getRandomNumber = (limit: number) => {
    return Math.floor(Math.random() * limit);
};

export const getBackgroundColor = () => {
    const h = getRandomNumber(360);
    const randomColor = `hsl(${h}deg, 50%, 50%)`;
    return randomColor;
};

export const getInitialLetter = (string: String) => {
    const defaultInitial = 'SU';

    if (string === undefined || string === null || isEmpty(string)) {
        return defaultInitial
    }

    if (string && typeof string === 'string') {
        const arrLetter = string.split(' ');
        if (arrLetter.length === 1) {
            return arrLetter[0].substring(0, 1);
        } else if (arrLetter.length > 1) {
            return arrLetter[0].substring(0, 1) + arrLetter[1].substring(0, 1);
        }
    } else {
        return defaultInitial
    }
}
export const removeZeroNumber = (num: { toString: () => string }) => num.toString().replace(/^0+/, '')
export const addDotSeparator = (num: { toString: () => string; }) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const removeNonNumeric = (num: { toString: () => string; }) => num.toString().replace(/[^0-9]/g, "");

export const handleInputNumberRupiah = (num: { toString: () => string }) => addDotSeparator(removeZeroNumber(removeNonNumeric(num)))


export const BLACKLISTIMAGE = [
    "49492a0" /* tif */,
    "47494638" /* gif */,
    "47494638",
    "424d8a7b" /* bmp */,
    "000c" /* jpeg2000 */,
    "0100" /* ttf */,
    "25504446" /* pdf */,
    "54686573" /* text */,
    "504b34" /* zip, xlsx, app, pptx */,
    "3c3f7068" /* php */,
    "696d706f" /* js */,
    "2d2d2d2d" /* pem */,
    "00018" /* heic, mp4 */,
    "38425053" /* psd */,
    "4f54544f" /* otf */,
    "7ba2020" /* json */,
    "23205448" /* lock */,
    "3c21444f" /* html */,
    "23204062" /* md */,
    "2a207ba" /* scss */,
    "2f2f2066" /* rc */,
    "3c737667" /* svg */,
    "55736572" /* txt */,
    "52494646" /* webp */,
  ];
  
export const WHITELISTIMAGE = ["89504e47", "ffd8ffe1", "ffd8ffe0"];

export const emailValidation = (value: string) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(value)
}

export function limitArraySize<T>(arr: T[], maxSize: number): T[] {
    if (arr?.length <= maxSize) {
      return arr; // Array size is within the limit, no need to truncate
    }
  
    return arr?.slice(0, maxSize); // Return the first `maxSize` elements
}

export function capitalizeFLetter(text: string) {
    if (!text) return;

    const splittedString = text?.split("-") as any;
    if (splittedString.length === 1) {
        return splittedString.at(0)[0].toUpperCase() + splittedString.at(0).slice(1);
    } else {
        const first = splittedString.at(0)[0].toUpperCase() + splittedString.at(0).slice(1);
        const second = splittedString.at(1)[0].toUpperCase() + splittedString.at(1).slice(1);
        return `${first} ${second}`
    }
}

export function combineArrays(arrays) {
    const combinedArray = [];
    
    for (const subArray of arrays) {
      combinedArray.push(...subArray);
    }
  
    return combinedArray;
  }