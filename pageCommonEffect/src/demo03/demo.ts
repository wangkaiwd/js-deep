const modal = document.querySelector<HTMLDivElement>('.modal')!;
const boundary = {};
let isPressMouse = false;
modal.addEventListener('mousedown', (e: MouseEvent) => {
  isPressMouse = true;
});
modal.addEventListener('mouseup', (e: MouseEvent) => {
  isPressMouse = false;
});
modal.addEventListener('mousemove', (e: MouseEvent) => {
  if (!isPressMouse) {return;}
  const { clientX, clientY } = e;
  const currentTarget = e.currentTarget as HTMLDivElement;
  if (currentTarget) {
    const { left, top } = currentTarget.getBoundingClientRect();
    // FIXME:这是在没有出现滚动条的情况
    currentTarget.style.left = clientX + 'px';
    currentTarget.style.top = clientY + 'px';
  }
});
