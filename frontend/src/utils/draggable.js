// draggable.js
 
export default {
    bind(el) {
      let startPosition = { x: 0, y: 0 };
      let dialogPosition = { x: 0, y: 0 };
      let dragging = false;
   
      const handleMouseDown = (e) => {
        startPosition.x = e.clientX;
        startPosition.y = e.clientY;
        dialogPosition.x = parseInt(el.style.left, 10) || 0;
        dialogPosition.y = parseInt(el.style.top, 10) || 0;
   
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
   
        dragging = true;
   
        e.stopPropagation();
        e.preventDefault();
      };
   
      const handleMouseMove = (e) => {
        if (dragging) {
          const offsetX = e.clientX - startPosition.x;
          const offsetY = e.clientY - startPosition.y;
          el.style.left = `${dialogPosition.x + offsetX}px`;
          el.style.top = `${dialogPosition.y + offsetY}px`;
        }
      };
   
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
   
        dragging = false;
      };
   
      el.addEventListener('mousedown', handleMouseDown);
    },
  };