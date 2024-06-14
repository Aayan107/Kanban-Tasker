<script lang="ts" setup>
import { useCloned } from '@vueuse/core'

const boardStore = useBoardStore()
const taskStore = useTaskStore()
const {
  createTask,
  editTask,
  closeModalTaskEdit,
  validateTaskTitle,
  validateSubtaskTitle,
} = taskStore
const { getBoardColumnsNameList } = storeToRefs(boardStore)
const { getEmptyTask, getTask, getModalTaskEdit } = storeToRefs(taskStore)

const validateStatus = ref(true)

const isEdit = computed(() => getModalTaskEdit.value.type === 'edit')
const title = computed(() => isEdit.value ? 'Edit Task' : 'Add New Task')
const saveBtnText = computed(() => isEdit.value ? 'Save Changes' : 'Create Task')

const { cloned: task, sync } = useCloned(getEmptyTask)
const subtasksTitle = computed(() => task.value.subtasks.map(subtask => subtask.title))


function initialData() {
  if (isEdit.value) {
    const { cloned: selectedTask } = useCloned(getTask)
    task.value = selectedTask.value
  }
  else {
    sync()
  }
}


function addSubtask() {
  task.value.subtasks.push({
    title: '',
    isCompleted: false,
  })
}


function save() {
  if (validateStatus.value) {
    if (isEdit.value)
      editTask(task.value)
    else
      createTask(task.value)
  }
}


function validate() {
  const checkLength = task.value.title.length > 0 && task.value.status.length > 0 && subtasksTitle.value.every(title => title.length > 0)
  const checkTask = validateTaskTitle(task.value.title, isEdit.value).status
  const checkSubtasks = validateSubtaskTitle(task.value.subtasks).status

  validateStatus.value = checkLength && checkTask && checkSubtasks
}

watch(() => getModalTaskEdit.value.display, (newValue) => {
  if (newValue)
    initialData()
})

watch([() => task.value.title, () => subtasksTitle.value], () => {
  validate()
})
</script>

<template>
  <BaseModal
    type="task"
    :display="getModalTaskEdit.display"
    :title="title"
    @close="closeModalTaskEdit()"
  >
    <template #body>
      <BaseFormItem
        v-model:single="task.title"
        type="single"
        label="Title"
        placeholder="e.g. Take coffee break"
        :validate="validateTaskTitle"
        :edit="isEdit"
      />

      <BaseFormItem
        v-model:textarea="task.description"
        type="textarea"
        label="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
      />

      <BaseFormItem
        v-model:subtask="task.subtasks"
        type="subtask"
        label="Subtasks"
        placeholder="e.g. Make coffee"
        :validate="validateSubtaskTitle"
      />

      <button class="btn-secondary" @click="addSubtask()">
        + Add New Subtask
      </button>

      <BaseFormItem
        v-model:select="task.status"
        :select-list="getBoardColumnsNameList"
        type="select"
        label="Status"
        placeholder="Please select"
      />
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
