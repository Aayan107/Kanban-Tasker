<script lang="ts" setup>
import { useVModels } from '@vueuse/core'
import type { Column, FormItemType, Subtask } from '@/types'

interface Props {
  label: string
  single?: string
  column?: Column[]
  textarea?: string
  select?: string
  selectList?: string[]
  subtask?: Subtask[]
  type: FormItemType
  placeholder?: string
  validate?: Function
  edit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  single: '',
  column: () => [],
  textarea: '',
  select: '',
  selectList: () => [],
  subtask: () => [],
  type: 'single',
  placeholder: '',
  validate: () => {},
  edit: true,
})

const emits = defineEmits([
  'update:single',
  'update:column',
  'update:textarea',
  'update:select',
  'update:subtask',
])

const { single, column, textarea, select, subtask } = useVModels(props, emits)

const renderTag = computed(() => (props.type === 'single' || props.type === 'textarea') ? 'label' : 'div')


function renderItem(type: FormItemType) {
  return props.type === type && props[type as keyof Props] !== null
}


function removeValue(idx: number) {
  switch (props.type) {
    case 'column':
      column.value.splice(idx, 1)
      break

    case 'subtask':
      if (subtask.value.length > 1) {
        subtask.value.splice(idx, 1)
      }
      else {
        subtask.value[idx].title = ''
        subtask.value[idx].isCompleted = false
      }
      break

    default:
      break
  }
}


function validateSingle() {
  return props.validate(single.value, props.edit)
}


function validateColumn() {
  return props.validate(column.value)
}


function validateSubtask() {
  return props.validate(subtask.value)
}
</script>

<template>
  <div class="form-item">
    <component :is="renderTag" class="form-item-label">
      <p class="form-item-label-text">
        {{ label }}
      </p>

      <template v-if="renderItem('single')">
        <BaseInput
          v-model="single"
          :placeholder="placeholder"
          :validate="validateSingle"
        />
      </template>

      <template v-if="renderItem('column')">
        <template v-for="(item, idx) in column" :key="idx">
          <BaseInput
            v-model="item.name"
            :placeholder="placeholder"
            :deletable="true"
            :validate="validateColumn"
            @remove="removeValue(idx)"
          />
        </template>
      </template>

      <template v-if="renderItem('checkbox')">
        <template v-for="(item, idx) in subtask" :key="idx">
          <BaseCheckbox
            v-model="subtask[idx]"
          />
        </template>
      </template>

      <template v-if="renderItem('subtask')">
        <template v-for="(item, idx) in subtask" :key="idx">
          <BaseInput
            v-model="item.title"
            :placeholder="placeholder"
            :deletable="true"
            :validate="validateSubtask"
            @remove="removeValue(idx)"
          />
        </template>
      </template>

      <template v-if="renderItem('textarea')">
        <BaseTextarea
          v-model="textarea"
          :placeholder="placeholder"
        />
      </template>

      <template v-if="renderItem('select')">
        <BaseSelect
          v-model="select"
          :list="selectList"
          :placeholder="placeholder"
        />
      </template>
    </component>
  </div>
</template>

<style lang="scss" scoped>
</style>
