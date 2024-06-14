import type { Operation, Subtask, Task, ValidateResult } from '@/types'

export const useTaskStore = defineStore('task', () => {
  const boardStore = useBoardStore()
  const { updateSelected } = boardStore
  const {
    boardList,
    getBoard,
    getSelected,
    getBoardColumnsNameList,
  } = storeToRefs(boardStore)

  const modalTaskEdit = ref({
    display: false,
    type: '',
  })
  const modalTaskDetail = ref({
    display: false,
  })

  const getEmptyTask = computed(() => ({
    title: '',
    description: '',
    status: getBoardColumnsNameList.value ? getBoardColumnsNameList.value[0] : '',
    subtasks: [
      {
        title: '',
        isCompleted: false,
      },
      {
        title: '',
        isCompleted: false,
      },
    ],
  }))
  const getTask = computed(() =>
    (
      getBoard.value?.columns[getSelected.value.columnIdx]?.tasks[getSelected.value.taskIdx]
      ?? getEmptyTask.value
    ),
  )
  const getModalTaskEdit = computed(() => modalTaskEdit.value)
  const getModalTaskDetail = computed(() => modalTaskDetail.value)

  
  function openModalTaskDetail(columnIdx: number, taskIdx: number) {
    updateSelected({ columnIdx, taskIdx })
    modalTaskDetail.value.display = true
  }

  
  function closeModalTaskDetail() {
    modalTaskDetail.value.display = false
  }

  
  function openModalTaskEdit(type: Operation) {
    modalTaskEdit.value.type = type
    modalTaskEdit.value.display = true
  }

  
  function closeModalTaskEdit() {
    modalTaskEdit.value.display = false
  }

  
  function createTask(newTask: Task) {
    const columnIdx = getBoard.value.columns.findIndex(item => item.name === newTask.status)
    boardList.value[getSelected.value.boardIdx].columns[columnIdx].tasks.push(newTask)

    const taskIdx = getBoard.value.columns[columnIdx].tasks.length - 1
    updateSelected({ columnIdx, taskIdx })

    closeModalTaskEdit()
  }

  
  function deleteTask() {
    boardList.value[getSelected.value.boardIdx]
      .columns[getSelected.value.columnIdx]
      .tasks.splice(getSelected.value.taskIdx, 1)
  }

  
  function editTask(newTask: Task) {
    const selectedColumnName = getBoard.value.columns[getSelected.value.columnIdx].name

    if (selectedColumnName === newTask.status) {
      boardList.value[getSelected.value.boardIdx].columns[getSelected.value.columnIdx].tasks[getSelected.value.taskIdx] = newTask

      closeModalTaskEdit()
    }
    else {
      deleteTask()
      createTask(newTask)
    }
  }

  
  function validateTaskTitle(inputValue: string, edit = true): ValidateResult {
    const sourceTitle = getTask.value.title
    let taskTitleList: string[] = []
    getBoard.value?.columns.forEach((column) => {
      const titleList = column.tasks.map(task => task.title)
      taskTitleList.push(...titleList)
    })

    if (edit)
      taskTitleList = taskTitleList.filter(title => title !== sourceTitle)

    const status = !taskTitleList.includes(inputValue)
    const msg = status ? '' : 'Duplicate title'

    return { status, msg }
  }

  
  function validateSubtaskTitle(list: Subtask[]): ValidateResult {
    const subtasksTitle = list.map(item => item.title)
    const duplicateList = subtasksTitle.filter((item, itemIdx) => subtasksTitle.indexOf(item) !== itemIdx)
    const status = duplicateList.length < 1
    const msg = status ? '' : 'Duplicate title'

    return { status, msg }
  }

  
  function syncTaskStatus(columnName?: string) {
    const selectedBoard = boardList.value[getSelected.value.boardIdx]

    if (columnName) {
      const columnIdx = getBoard.value.columns.findIndex(item => item.name === columnName)
      selectedBoard.columns[columnIdx].tasks.forEach(task => task.status = columnName)
    }
    else {
      selectedBoard.columns.forEach((column) => {
        column.tasks.forEach(task => task.status = column.name)
      })
    }
  }

  return {
    getEmptyTask,
    getTask,
    getModalTaskDetail,
    getModalTaskEdit,
    openModalTaskDetail,
    closeModalTaskDetail,
    openModalTaskEdit,
    closeModalTaskEdit,
    createTask,
    editTask,
    deleteTask,
    validateTaskTitle,
    validateSubtaskTitle,
    syncTaskStatus,
  }
})
