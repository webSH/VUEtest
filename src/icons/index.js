import Vue from 'vue'
import SvgIcon from '@/components/common/SvgIcon'

//全局注册
Vue.component("Icon",SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./common', false, /\.svg$/)
requireAll(req)

