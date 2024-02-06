import { RouterView } from 'vue-router'
import AppHeader from '@/layouts/AppHeader'
import AppDrawer from '@/layouts/AppDrawer'
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'AppLayout',
    components: {
        AppHeader,
        AppDrawer
    },
    setup() {
        return () => (
            <v-app>
                <v-main>
                    <app-header />
                    <app-drawer />
                    <RouterView />
                </v-main>
            </v-app>
        )
    }
})
