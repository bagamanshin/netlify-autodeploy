export const regexLogin = /^(?=.{3,20}$)[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/;
export const regexPassword = /^(?=.{8,20}$)(?=.*)(?=.*[A-Z])(?=.*[0-9]).*$/;
export const regexEmail = /^[a-zA-Z0-9_!#$%&'*+=?`{|}~^.-]+@[a-zA-Z]+\.[a-z]+$/;
export const regexPhone = /^[0-9+]\d{9,14}$/;
export const regexName = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]*$/;
export const regexNotEmpty = /^(?!\s*$).+$/;
