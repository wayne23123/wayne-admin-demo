import { ElNotification, ElMessageBox } from 'element-plus';

// https://element-plus.org/zh-CN/component/notification.html#%E9%85%8D%E7%BD%AE%E9%A1%B9

// 消息提示
export function toast(
  message,
  type = 'success',
  dangerouslyUseHTMLString = false
) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  });
}

// https://element-plus.org/zh-CN/component/message-box.html
export function showModal(content= '提示內容',type = 'warning', title='') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type,
    }
  )
}
