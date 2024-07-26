// useDrag.js
import { ref, onUnmounted } from 'vue'

export function useDraggable(dragHandle: HTMLElement, moveElement: HTMLElement) {
  const isDragging = ref(false)
  const currentX = ref(0)
  const currentY = ref(0)
  const initialX = ref(0)
  const initialY = ref(0)
  const xOffset = ref(0)
  const yOffset = ref(0)
  const handleMouseDown = (event) => {
    if (event.type.startsWith('touch')) {
      event.clientX = event.touches[0].clientX
      event.clientY = event.touches[0].clientY
    }

    isDragging.value = true
    initialX.value = event.clientX - xOffset.value
    initialY.value = event.clientY - yOffset.value

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseUp)
  }

  const handleMouseMove = (event) => {
    if (isDragging.value) {
      if (event.type.startsWith('touch')) {
        event.clientX = event.touches[0].clientX
        event.clientY = event.touches[0].clientY
      }

      currentX.value = event.clientX - initialX.value + xOffset.value
      currentY.value = event.clientY - initialY.value + yOffset.value

      moveElement.style.transform = `translate3d(${currentX.value}px, ${currentY.value}px, 0)`
    }
  }

  const handleMouseUp = () => {
    isDragging.value = false
    xOffset.value = currentX.value
    yOffset.value = currentY.value

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('touchmove', handleMouseMove)
    document.removeEventListener('touchend', handleMouseUp)
  }

  dragHandle.addEventListener('mousedown', handleMouseDown)
  console.log(dragHandle)
  dragHandle.addEventListener('touchstart', handleMouseDown)

  onUnmounted(() => {
    dragHandle.removeEventListener('mousedown', handleMouseDown)
    dragHandle.removeEventListener('touchstart', handleMouseDown)
  })
}
