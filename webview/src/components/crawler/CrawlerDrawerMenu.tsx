import _ from 'lodash'
import dayjs from 'dayjs'
import {
    computed,
    reactive,
    defineComponent,
    inject,
    onBeforeMount,
    Teleport,
    type PropType
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrawlerStore } from '@/stores/crawler'
import { useAppStore } from '@/stores/app'
import { crawlerState, useCrawler } from '@/composables/useCrawler'
import commonUtil from '@/utils/common'
import type { Crawler } from '@/types/model'
import ModalDialog from '@/components/ui/ModalDialog'
import TextField from '@/components/form/TextField'
import WorkerForm from '@/components/crawler/WorkerForm'
import './CrawlerDrawerMenu.scoped.scss'
interface IWorkerDrawerMenu {
    keyword: string
    workerForm: {
        modal: boolean
        props: Crawler.IWorker | null
    }
}
export default defineComponent({
    name: 'WorkerDrawerMenu',
    components: {
        ModalDialog,
        TextField,
        WorkerForm
    },
    setup(props) {
        const $toast = inject('toast') as IToastPlugin
        const route = useRoute()
        const router = useRouter()
        const appStore = useAppStore()
        const crawlerStore = useCrawlerStore()
        const { loadWorker, deleteWorker } = useCrawler(crawlerState)
        const state = reactive<IWorkerDrawerMenu>({
            keyword: '',
            workerForm: {
                modal: false,
                props: null
            }
        })
        const filterItems = computed(() => {
            let items: Crawler.IWorker[] = []
            try {
                items = crawlerStore.getWorkers.filter((item: Crawler.IWorker) =>
                    commonUtil.searchByInitial(item.label, state.keyword)
                )
            } catch (e) {
                console.error(e)
            }
            return items
        })
        // 컨텍스트 메뉴 열기
        const onContextMenu = (event: MouseEvent, worker?: Crawler.IWorker) => {
            event.stopPropagation()
            if (event.button != 2) {
                return
            }
            let items = [
                {
                    name: 'refresh',
                    desc: '새로고침',
                    shortcut: 'R',
                    icon: 'mdi:mdi-refresh',
                    cb() {
                        loadWorker()
                        appStore.toggleMenu(false)
                    }
                }
            ]
            if (worker) {
                items = [
                    ...items,
                    {
                        name: 'edit-label-worker',
                        desc: '라벨 편집',
                        shortcut: 'E',
                        icon: 'mdi:mdi-file-edit-outline',
                        cb() {
                            onToggleForm(true, worker)
                            appStore.toggleMenu(false)
                        }
                    },
                    {
                        name: 'delete-worker',
                        desc: '삭제하기',
                        shortcut: 'D',
                        icon: 'mdi:mdi-trash-can-outline',
                        cb() {
                            deleteWorker(worker)
                            appStore.toggleMenu(false)
                        }
                    }
                ]
            }
            appStore.toggleMenu(true, {
                pageX: event.pageX,
                pageY: event.pageY,
                items
            })
        }
        const onToggleForm = (modal: boolean, worker: Crawler.IWorker) => {
            if (!_.isBoolean(modal)) {
                return
            }
            if (modal && worker) {
                state.workerForm.props = worker
            } else {
                state.workerForm.props = null
            }
            state.workerForm.modal = modal
        }
        const onSubmitForm = ({
            id,
            label
        }: {
            id: Crawler.IWorker['id']
            label: Crawler.IWorker['label']
        }) => {
            crawlerStore
                .saveWorkerLabel({ id, label })
                .then(() => {
                    state.workerForm.modal = false
                    $toast.success('자동화 라벨을 수정 했습니다')
                })
                .catch(() => $toast.error(new Error('자동화 라벨을 수정 할 수 없습니다')))
                .finally(loadWorker)
        }
        const onCancelForm = () => {
            loadWorker()
            state.workerForm.modal = false
        }
        const onCreateWorker = () => {
            crawlerStore
                .saveWorker({
                    label: `자동화 세트 ${dayjs().format('HHmm')}`,
                    commands: []
                })
                .then(() => $toast.success('자동화를 생성 했습니다'))
                .catch(() => $toast.error(new Error('자동화를 생성 할 수 없습니다')))
                .finally(onCancelForm)
        }
        const onRouteWorkerCard = (event: Event, worker: Crawler.IWorker) => {
            router.push({ name: 'crawler-worker', params: { id: worker.id } })
        }
        return () => (
            <div class="crawler-drawer-menu flex flex-col gap-2">
                <div class="crawler-drawer-menu__header">
                    <text-field v-model={state.keyword} placeholder="자동화 항목을 검색합니다." />
                </div>
                <div
                    class="crawler-drawer-menu__content"
                    onMouseup={(event: MouseEvent) => onContextMenu(event)}
                >
                    <ul class="worker-menu flex flex-col gap-2 w-full">
                        {filterItems.value.map((worker) => (
                            <li class="worker-menu__item flex justify-start items-center">
                                <div
                                    class={{
                                        'worker-card box-shadow': true,
                                        'worker-card--active': route.params.id == worker.id
                                    }}
                                    onClick={(event: Event) => onRouteWorkerCard(event, worker)}
                                    onMouseup={(event: MouseEvent) => onContextMenu(event, worker)}
                                >
                                    <div class="flex justify-between items-center">
                                        <p>{worker.label}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="crawler-drawer-menu__actions">
                    <button type="button" class="btn-create" onClick={onCreateWorker}>
                        <b>자동화 생성</b>
                    </button>
                </div>
                <Teleport to="body">
                    <modal-dialog
                        title="자동화 라벨 편집기"
                        modelValue={state.workerForm.modal}
                        onUpdate:modelValue={onToggleForm}
                        persistent
                        hide-actions
                    >
                        <worker-form
                            {...state.workerForm.props}
                            onSubmit={onSubmitForm}
                            onCancel={onCancelForm}
                        />
                    </modal-dialog>
                </Teleport>
            </div>
        )
    }
})
