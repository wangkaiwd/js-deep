const selector = '.self-modal';
const modal = document.querySelector<HTMLDivElement>(selector)!;
const { width, height } = modal.getBoundingClientRect();
// 浏览器窗口的宽度和高度(包含滚动条): window.innerHeight,window.innerWidth
const boundary = {
  minX: 0,
  minY: 0,
  maxX: window.innerWidth - width,
  maxY: window.innerHeight - height,
};
let offsetX = 0, offsetY = 0;
let pressing = false;
modal.addEventListener('mousedown', (e: MouseEvent) => {
  pressing = true;
  const { clientX, clientY } = e;
  const { top, left } = modal.getBoundingClientRect();
  offsetX = clientX - left;
  offsetY = clientY - top;

});

document.addEventListener('mouseup', (e: MouseEvent) => {
  pressing = false;
  offsetX = 0;
  offsetY = 0;
});
document.addEventListener('mousemove', (e: MouseEvent) => {
  if (!pressing) {return;}
  const { clientX, clientY } = e;
  // 思路还要梳理一遍,最好画图
  const { minY, maxY, minX, maxX } = boundary;
  let moveX = clientX - offsetX;
  let moveY = clientY - offsetY;
  if (moveX <= minX) {moveX = minX;}
  if (moveX >= maxX) {moveX = maxX;}
  if (moveY <= minY) {moveY = minY;}
  if (moveY >= maxY) {moveY = maxY;}
  modal.style.top = moveY + height / 2 + 'px';
  modal.style.left = moveX + width / 2 + 'px';
});
