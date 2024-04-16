import { FormGroup } from '@angular/forms';
import { isURL } from 'class-validator';
import { environment } from 'src/environments/environment';
import { trimEnd, trimStart } from 'lodash';

const fnGetRandomNum = function getRandomNum(m: number, n: number): number {
  const num = Math.floor(Math.random() * (m - n) + n);
  return num;
};

const fnGetFile = function getFile(url: string, isBlob = false): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    client.responseType = isBlob ? 'blob' : '';
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return;
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/');
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1],
        });
      } else {
        reject(new Error(client.statusText));
      }
    };
    client.open('GET', url);
    client.send();
  });
};

const fnCheckForm = function checkForm(form: FormGroup): boolean {
  Object.keys(form.controls).forEach((key) => {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  });
  return !form.invalid;
};

const fnGetBase64 = function getBase64(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const fnGetApiUrl = function (path?: string, isBiexce: boolean = false) {
  let apiPre = isBiexce ? environment.apiBiexceUrl : environment.apiUrl;
  if (path) {
    if (isURL(path)) return path;
    return trimEnd(apiPre, '/') + '/' + trimStart(path, '/');
  }
  return trimEnd(apiPre, '/');
};

const showNotification = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  title?: string
) => {
  if (!title) {
    title = 'core.notification.info';
    if (type == 'success') title = 'core.notification.success';
    else if (type == 'error') title = 'core.notification.error';
    else if (type == 'warning') title = 'core.notification.warning';
  }
  // const service = AppService.injector.get(ToastrService)
  // if (type == 'success') {
  //   return service.success(message, title)
  // } else if (type == 'error') {
  //   return service.error(message, title)
  // } else if (type == 'warning') {
  //   return service.warning(message, title)
  // }
  // return service.info(message, title)
};
const showNotificationSuccess = (message: string, title?: string) => {
  showNotification(message, 'success', title);
};
const showNotificationError = (message: string, title?: string) => {
  showNotification(message, 'error', title);
};
const showNotificationWarning = (message: string, title?: string) => {
  showNotification(message, 'warning', title);
};
const showNotificationInfo = (message: string, title?: string) => {
  showNotification(message, 'info', title);
};

export {
  fnCheckForm,
  fnGetApiUrl,
  fnGetBase64,
  fnGetFile,
  fnGetRandomNum,
  showNotification,
  showNotificationError,
  showNotificationInfo,
  showNotificationSuccess,
  showNotificationWarning,
};
