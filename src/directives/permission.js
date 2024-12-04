// https://cn.vuejs.org/guide/reusability/custom-directives.html#introduction
import store from '@/store';

function hasPermission(value, el = false) {
    if (!Array.isArray(value)) {
        throw new Error(`需要配置權限，例如 v-permission="['getStatistics3,GET']"`)
    }
    const hasAuthorization = value.findIndex(item => store.state.ruleNames.includes(item)) != -1
    if (el && !hasAuthorization) {
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuthorization
}

export default {
    install(app) {
        // console.log('app', app)

        app.directive('permission', {
            mounted(el, binding) {
                // console.log('el', el)
                // console.log('binding', binding)

                hasPermission(binding.value, el)
            }
        })
    }
}