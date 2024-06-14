<script lang="ts" setup>
import { useCloned } from '@vueuse/core'

const boardStore = useBoardStore()
const {
  createBoard,
  editBoard,
  closeModalBoard,
  validateBoardName,
  validateColumnName,
} = boardStore
const { getEmptyBoard, getBoard, getModalBoardInfo } = storeToRefs(boardStore)

const validateStatus = ref(true)

const isEdit = computed(() => getModalBoardInfo.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Board' : 'Add New Board')
const saveBtnText = computed(() => isEdit.value ? 'Save Changes' : 'Create New Board')

const { cloned: board, sync } = useCloned(getEmptyBoard)
const columnsName = computed(() => board.value.columns.map(column => column.name))


function initialData() {
  if (isEdit.value) {
    const { cloned: selectedBoard } = useCloned(getBoard)
    board.value = selectedBoard.value

    if (getModalBoardInfo.value.addNewColumn)
      addColumn()
  }
  else {
    sync()
  }
}


function addColumn() {
  board.value.columns.push({ name: '', tasks: [] })
}


function save() {
  if (validateStatus.value) {
    if (isEdit.value)
      editBoard(board.value)
    else
      createBoard(board.value)
  }
}


function validate() {
  const checkLength = board.value.name.length > 0 && columnsName.value.every(name => name.length > 0)
  const checkBoard = validateBoardName(board.value.name, isEdit.value).status
  const checkColumns = validateColumnName(board.value.columns).status

  validateStatus.value = checkLength && checkBoard && checkColumns
}

watch(() => getModalBoardInfo.value.display, (newValue) => {
  if (newValue)
    initialData()
})

watch([() => board.value.name, () => columnsName.value], () => {
  validate()
})
</script>

<template>
  <BaseModal
    type="board"
    :display="getModalBoardInfo.display"
    :title="title"
    @close="closeModalBoard"
  >
    <template #body>
      <BaseFormItem
        v-model:single="board.name"
        type="single"
        label="Board Name"
        placeholder="e.g. Web Design"
        :validate="validateBoardName"
        :edit="isEdit"
      />

      <BaseFormItem
        v-model:column="board.columns"
        type="column"
        label="Board Columns"
        placeholder="e.g. Todo"
        :validate="validateColumnName"
      />

      <button class="btn-secondary" @click="addColumn()">
        + Add New Column
      </button>
    </template>

    <template #footer>
      <button
        class="btn-primary"
        :disabled="!validateStatus"
        @click="save()"
      >
        {{ saveBtnText }}
      </button>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.btn-secondary {
  margin-top: 12px;
}
</style>
