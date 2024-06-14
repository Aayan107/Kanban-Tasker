<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

const boardStore = useBoardStore()
const sidebarStore = useSidebarStore()
const alertStore = useAlertStore()
const { openModalBoard, updateSelected, resetBoard } = boardStore
const { closeSidebar } = sidebarStore
const { openModalAlert } = alertStore
const { boardList, getBoardList, getSelected } = storeToRefs(boardStore)

const { isMobile } = useDevice()

const sum = computed(() => getBoardList.value.length)


function isSelected(idx: number) {
  return idx === getSelected.value.boardIdx
}


function selectBoard(idx: number, close = true) {
  if (isMobile.value && close)
    closeSidebar()

  updateSelected({ boardIdx: idx })
}


function createBoard() {
  if (isMobile.value)
    closeSidebar()

  openModalBoard('create')
}


function resetData() {
  if (isMobile.value)
    closeSidebar()

  openModalAlert({
    title: 'Reset All Data',
    content: 'Are you sure you want to reset all data? This action cannot be reversed.',
    destructiveText: 'Reset',
    onDestructive: resetBoard,
  })
}


function dragUpdate() {
  const newSelectedIdx = getBoardList.value.findIndex(board => board.name === getSelected.value.boardName)
  selectBoard(newSelectedIdx, false)
}
</script>

<template>
  <section class="section section-board">
    <div class="section-container">
      <h2 class="board-title heading-s">
        ALL BOARDS ({{ sum }})
      </h2>

      <VueDraggable
        v-model="boardList"
        tag="ul"
        class="board-list"
        group="sidebar"
        handle=".board-btn-icon"
        draggable=".board-item-draggable"
        @update="dragUpdate"
      >
        <li
          v-for="(board, idx) in getBoardList"
          :key="board.name"
          class="board-item board-item-draggable"
        >
          <button
            class="board-btn btn-lg"
            :class="{ 'btn-primary': isSelected(idx), 'btn-sidebar-board': !isSelected(idx) }"
            :disabled="isSelected(idx)"
            @click="selectBoard(idx)"
          >
            <SvgoIconBoard class="board-btn-icon" />
            <span class="board-btn-text">{{ board.name }}</span>
          </button>
        </li>

        <li class="board-item">
          <button class="board-btn board-btn-create btn-lg btn-sidebar-board" @click="createBoard">
            <SvgoIconBoard class="board-btn-icon" />
            <span class="board-btn-text">+ Create New Board</span>
          </button>
        </li>

        <li class="board-item">
          <button class="board-btn btn-lg btn-destructive" @click="resetData()">
            <SvgoIconBoard class="board-btn-icon" />
            <span class="board-btn-text">Reset All Data</span>
          </button>
        </li>
      </VueDraggable>
    </div>
  </section>
</template>

<style lang="scss" scoped>
button[disabled] {
  opacity: 1;
}

.section-board .section-container {
  padding-left: 0;
}

.board {
  &-title {
    padding-inline: var(--sidebar-board-padding-inline);
    color: var(--text-secondary-color);
  }

  &-list {
    padding: 19px 0 16px;
  }
}

.board-btn {
  display: flex;
  align-items: center;
  padding-inline: var(--sidebar-board-padding-inline);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  text-align: left;

  &-create {
    color: $primary;
  }

  &-icon {
    width: 16px;
    height: 16px;
    margin-right: 12px;

    @at-root .board-item-draggable & {
      cursor: grab;
    }
  }

  &-text {
    flex: 1;
  }
}
</style>
