import { defineStore } from 'pinia'
import { CloseBxEnum, StoresEnum, ThemeEnum } from '@/enums'

// TODO 使用indexDB或者把配置写出到文件中，还需要根据每个账号来进行配置 (nyh -> 2024-03-26 01:22:12)
export const setting = defineStore(StoresEnum.SETTING, {
  state: (): STO.Setting => ({
    /* 主题设置 */
    themes: {
      content: '',
      pattern: ''
    },
    /* 是否启用ESC关闭窗口 */
    escClose: true,
    /* 系统托盘 */
    tips: {
      type: CloseBxEnum.HIDE,
      notTips: false
    },
    /* 登录设置 */
    login: {
      autoLogin: false,
      autoStartup: false,
      /* 用户保存的登录信息 */
      accountInfo: {
        account: '',
        password: '',
        name: '',
        avatar: ''
      }
    },
    /* 聊天设置 */
    chat: {
      /* 发送快捷键 */
      sendKey: 'Enter',
      /* 是否双击打开独立会话窗口 */
      isDouble: true
    }
  }),
  actions: {
    /* 初始化主题 */
    initTheme(theme: string) {
      this.themes.content = theme
      document.documentElement.dataset.theme = theme
      this.themes.pattern = theme
    },
    /* 切换主题 */
    toggleTheme(theme: string) {
      if (theme === ThemeEnum.OS) {
        this.themes.pattern = theme
        const os = matchMedia('(prefers-color-scheme: dark)').matches ? ThemeEnum.DARK : ThemeEnum.LIGHT
        document.documentElement.dataset.theme = os
        this.themes.content = os
      } else {
        this.themes.content = theme
        document.documentElement.dataset.theme = theme
        this.themes.pattern = theme
      }
    },
    /* 切换登录设置 */
    toggleLogin(autoLogin: boolean, autoStartup: boolean) {
      this.login.autoLogin = autoLogin
      this.login.autoStartup = autoStartup
    },
    /* 设置用户保存的登录信息 */
    setAccountInfo(accountInfo: STO.Setting['login']['accountInfo']) {
      this.login.accountInfo = accountInfo
    },
    /* 清空账号信息 */
    clearAccount() {
      this.login.accountInfo = { account: '', avatar: '', name: '', password: '' }
    }
  },
  share: {
    enable: true,
    initialize: true
  }
})
