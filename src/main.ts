import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { ClientsDB } from './modules/ClientsDB'

// Expose backend interfacing functions in frontend.
Vue.prototype.$electron = window.electron;

// Vue.prototype.$storeManager = StoreManager;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Declare types for interface to interact with backend.
declare global {
  interface Window {
    electron: {
      path: {
        sep: () => string
      }
      clients: {
        get: () => ClientsDB | null
        write: (e: ClientsDB) => void
      },
      window: {
        handle: (handleType: "minimize" | "maximize" | "close") => void;
      },
      app: {
        getDocumentsPath: () => string
      },
      shell: {
        openExternalPlayer: (url: string) => void
        openPath: (url: string) => void
      },
      ipc: {
        invoke: (channel: string, data?: any) => Promise<any>;
        send: (channel: string, data?: any) => void;
        receive: (channel: string, ...args: any[]) => (() => void);
        removeAll: (channel: string) => void;
      }
      dialog: {
        openDialog: () => string[] | null,
        openDialogPfp: (id: string) => string[] | null
      },
      fs: {
        existsSync: (path: string) => boolean;
      }
      axios: {
        get: (url: string) => { data: any; status: number; };
      }
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}