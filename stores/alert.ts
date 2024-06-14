export const useAlertStore = defineStore('alert', () => {
  interface ModalAlertParams {
    title: string
    content: string
    destructiveText: string
    onDestructive: () => void
  }

  const modal = ref({
    display: false,
    title: '',
    content: '',
    destructiveText: '',
    onDestructive: () => {},
  })

  const getModalAlertInfo = computed(() => modal.value)

  
  function openModalAlert(info: ModalAlertParams) {
    modal.value.title = info.title
    modal.value.content = info.content
    modal.value.destructiveText = info.destructiveText
    modal.value.onDestructive = info.onDestructive
    modal.value.display = true
  }

  
  function closeModalAlert() {
    modal.value.display = false
  }

  return {
    getModalAlertInfo,
    openModalAlert,
    closeModalAlert,
  }
})
