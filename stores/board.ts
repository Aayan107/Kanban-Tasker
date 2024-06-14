import initialData from '@/assets/data/boards.json'
import type { Board, Column, Operation, ValidateResult } from '@/types'

interface Selected {
  boardIdx: number
  boardName: string
  columnIdx: number
  taskIdx: number
}

export const useBoardStore = defineStore('board', () => {
  const isLoading = ref(true)
  const boardList: Ref<Board[]> = ref([{ name: '', columns: [] }])

  const selected: Ref<Selected> = ref({
    boardIdx: 0,
    boardName: '',
    columnIdx: 0,
    taskIdx: 0,
  })
  const modal = ref({
    display: false,
    type: '',
    addNewColumn: false,
  })

  const getIsLoading = computed(() => isLoading.value)
  const getEmptyBoard: Ref<Board> = computed(() => ({
    name: '',
    columns: [
      { name: 'Todo', tasks: [] },
      { name: 'Doing', tasks: [] },
    ],
  }))
  const getBoardList = computed(() => boardList.value)
  const getBoard = computed(() => boardList.value[selected.value.boardIdx])
  const getBoardColumnsNameList = computed(() => getBoard.value?.columns.map(item => item.name))
  const getModalBoardInfo = computed(() => modal.value)
  const getSelected = computed(() => selected.value)

  
  function updateSelected({ boardIdx, columnIdx, taskIdx }: { boardIdx?: number; columnIdx?: number; taskIdx?: number }) {
    if (typeof boardIdx === 'number') {
      selected.value.boardIdx = boardIdx
      selected.value.boardName = getBoard.value?.name ?? ''
    }

    if (typeof columnIdx === 'number')
      selected.value.columnIdx = columnIdx

    if (typeof taskIdx === 'number')
      selected.value.taskIdx = taskIdx
  }

  
  function openModalBoard(type: Operation, addNewColumn: boolean = false) {
    modal.value.type = type
    modal.value.display = true
    modal.value.addNewColumn = addNewColumn
  }

  
  function closeModalBoard() {
    modal.value.display = false
  }

  
  function createBoard(newBoard: Board) {
    boardList.value.push(newBoard)
    updateSelected({ boardIdx: boardList.value.length - 1 })

    closeModalBoard()
  }

  
  function editBoard(newBoard: Board) {
    boardList.value[selected.value.boardIdx] = newBoard

    closeModalBoard()
  }

  
  function deleteBoard() {
    let selectedBoardIdx = selected.value.boardIdx
    boardList.value.splice(selectedBoardIdx, 1)

    if (!getBoard.value)
      selectedBoardIdx = boardList.value.length - 1

    if (selectedBoardIdx < 0)
      selectedBoardIdx = 0

    updateSelected({ boardIdx: selectedBoardIdx })
  }

  
  function setBoardData(newData: Board[]) {
    isLoading.value = true

    boardList.value = newData

    updateSelected({
      boardIdx: 0,
      columnIdx: 0,
      taskIdx: 0,
    })

    isLoading.value = false
  }

  
  function resetBoard() {
    setBoardData(initialData.boards)
  }

  
  function addNewColumn() {
    openModalBoard('edit', true)
  }

  
  function validateBoardName(inputValue: string, edit = true): ValidateResult {
    const sourceName = getBoard.value?.name
    let boardNameList = getBoardList.value.map(board => board.name)

    if (edit)
      boardNameList = boardNameList.filter(name => name !== sourceName)

    const status = !boardNameList.includes(inputValue)
    const msg = status ? '' : 'Duplicate name'

    return { status, msg }
  }

  
  function validateColumnName(list: Column[]): ValidateResult {
    const columnsName = list.map(item => item.name)
    const duplicateList = columnsName.filter((item, itemIdx) => columnsName.indexOf(item) !== itemIdx)
    const status = duplicateList.length < 1
    const msg = status ? '' : 'Duplicate name'

    return { status, msg }
  }

  return {
    boardList,
    getIsLoading,
    getEmptyBoard,
    getBoardList,
    getBoard,
    getBoardColumnsNameList,
    getModalBoardInfo,
    getSelected,
    updateSelected,
    openModalBoard,
    closeModalBoard,
    createBoard,
    editBoard,
    deleteBoard,
    setBoardData,
    resetBoard,
    addNewColumn,
    validateBoardName,
    validateColumnName,
  }
})
