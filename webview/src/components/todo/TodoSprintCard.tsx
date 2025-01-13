import { defineComponent, reactive, type PropType } from 'vue'
import TextField from '@/components/form/TextField'
import type { ITodoSprint } from '@/types/model'
import './TodoSprintCard.scoped.scss'
enum TodoSprintCardMode {
    VIEW_MODE,
    EDIT_MODE
}
interface ITodoSprintCardState {
    mode: TodoSprintCardMode
    inputTitle: ITodoSprint['title']
    inputChecked: ITodoSprint['checked']
}

export default defineComponent({
    name: 'TodoSprintCard',
    emits: ['update', 'delete'],
    props: {
        id: {
            type: String as PropType<ITodoSprint['id']>,
            default: ''
        },
        title: {
            type: String as PropType<ITodoSprint['title']>,
            default: ''
        },
        checked: {
            type: Boolean as PropType<ITodoSprint['checked']>,
            default: false
        }
    },
    components: {
        TextField
    },
    setup(props, { emit }) {
        const state = reactive<ITodoSprintCardState>({
            mode: TodoSprintCardMode.VIEW_MODE,
            inputTitle: props.title,
            inputChecked: props.checked
        })
        const onBeforeUpdate = () => {
            state.mode = TodoSprintCardMode.EDIT_MODE
        }
        const onUpdate = () => {
            emit('update', { id: props.id, title: state.inputTitle, checked: state.inputChecked })
            state.mode = TodoSprintCardMode.VIEW_MODE
        }
        const onCheck = () => {
            state.inputChecked = !state.inputChecked
            onUpdate()
        }
        const onDelete = () => {
            emit('delete', props.id)
        }
        return () => (
            <div
                class={{
                    'todo-sprint-card flex justify-between items-center': true,
                    'todo-sprint-card--checked': props.checked,
                    'todo-sprint-card--updated': state.mode == TodoSprintCardMode.EDIT_MODE
                }}
            >
                <div class="flex items-center gap-2">
                    <button type="button" class="btn-check" onClick={onCheck}>
                        <i class="mdi mdi-check" />
                        <span class="tooltip">체크하기</span>
                    </button>
                    {state.mode == TodoSprintCardMode.VIEW_MODE ? (
                        <span>{props.title}</span>
                    ) : (
                        <text-field
                            v-model={state.inputTitle}
                            placeholder="스프린트 제목"
                            onEnter={onUpdate}
                        />
                    )}
                </div>
                <div class="flex items-center gap-2">
                    {state.mode == TodoSprintCardMode.VIEW_MODE ? (
                        <button type="button" onClick={onBeforeUpdate}>
                            <i class="mdi mdi-pencil-outline" />
                            <span class="tooltip">수정</span>
                        </button>
                    ) : (
                        <button type="button" onClick={onUpdate}>
                            <i class="mdi mdi-pencil-outline" />
                            <span class="tooltip">저장</span>
                        </button>
                    )}
                    <button type="button" onClick={onDelete}>
                        <i class="mdi mdi-delete" />
                        <span class="tooltip">삭제</span>
                    </button>
                </div>
            </div>
        )
    }
})
