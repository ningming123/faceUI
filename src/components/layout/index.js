import Container from './container'
import Main from './main'
import Header from './header'
import Footer from './footer'
import Sider from './sider'
import HomePage from './homePage'
import './layout.less'

Container.install = function (Vue, options = {}) {
  Vue.component(options.containerName || Container.name, Container)
  Vue.component(options.mainName || Main.name, Main)
  Vue.component(options.headerName || Header.name, Header)
  Vue.component(options.footerName || Footer.name, Footer)
  Vue.component(options.silderName || Sider.name, Sider)
  Vue.component(options.homePageName || HomePage.name, HomePage)
}

export const MContainer = Container
export const MMain = Main
export const MHeader = Header
export const MFooter = Footer
export const MSider = Sider

export default Container
