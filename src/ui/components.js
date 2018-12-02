import uiAlert from './Alert/uiAlert'
import uiAlertMethod from './Alert/uiAlertMethod'
import uiCarousel from './Carousel/uiCarousel'
import uiAccordion from './Accordion/uiAccordion'
import uiAffix from './Affix/uiAffix'
import uiAside from './Aside/uiAside'
import uiCheckboxGroup from './Checkbox/uiCheckboxGroup'
import uiCheckbox from './Checkbox/uiCheckbox'
import uiCheckboxBtn from './Checkbox/uiCheckboxBtn'
import uiCascader from './Cascader/uiCascader'
import uiToastMethod from './Toast/uiToastMethod'
import uiLabel from './Label/uiLabel'
import uiInput from './Input/uiInput'
import uiInputNumber from './InputNumber/uiInputNumber'
import uiTextarea from './Textarea/uiTextarea'
import uiDatepicker from './Datepicker/uiDatepicker'
import uiTimepicker from './Timepicker/uiTimepicker'
import uiDatetimepicker from './Datetimepicker/uiDatetimepicker'
import uiDropdown from './Dropdown/uiDropdown'
import uiModal from './Modal/uiModal'
import uiModalMethod from './Modal/uiModalMethod'
import uiOption from './Select/uiOption'
import uiPanel from './Accordion/uiPanel'
import uiPopover from './Popover/uiPopover'
import uiPopConfirm from './Popover/uiPopConfirm'
import uiProgressbar from './Progress/uiProgressbar'
import uiProgress from './Progress/uiProgress'
import uiRadio from './Radio/uiRadio'
import uiRadioBtn from './Radio/uiRadioBtn'
import uiRadioGroup from './Radio/uiRadioGroup'
import uiSelect from './Select/uiSelect'
import uiTab from './Tabs/uiTab'
import uiTabs from './Tabs/uiTabs'
import uiTooltip from './Tooltip/uiTooltip'
import uiButton from './Button/uiButton'
import uiButtonGroup from './Button/uiButtonGroup'
import uiContainer from './Layout/uiContainer'
import uiRow from './Layout/uiRow'
import uiNav from './Nav/uiNav'
import uiSubNav from './Nav/uiSubNav'
import uiNavItem from './Nav/uiNavItem'
import uiNavGroup from './Nav/uiNavGroup'
import uiColumn from './Layout/uiColumn'
import uiSwitch from './Switch/uiSwitch'
import uiMultipleInput from './MultipleInput/uiMultipleInput'
import uiPage from './Page/uiPage'
import uiStep from './Step/uiStep'
import uiDataTable from './DataTable/uiDataTable'
import uiLoading from './Loading/uiLoading'
import uiTimeline from './Timeline/uiTimeline'
import uiTimelineItem from './Timeline/uiTimelineItem'
import uiTypeahead from './Typeahead/uiTypeahead'
import uiIcon from './Icon/uiIcon'
import uiTags from './Tags/uiTags'
import uiBreadcrumb from './Breadcrumb/uiBreadcrumb'
import uiBreadcrumbItem from './Breadcrumb/uiBreadcrumbItem'
import uiForm from './Form/uiForm'
import uiFormItem from './Form/uiFormItem'
import uiSlider from './Slider/uiSlider'
import uiSlide from './Carousel/uiSlide'
import uiTree from './Tree/uiTree'
import uiCard from './Card/uiCard'
import uiRate from './Rate/uiRate'
import uiUploader from './Uploader/uiUploader'
import uiRequest from './Request/uiRequest'
import uiColorpicker from './Colorpicker/uiColorpicker'
import uiCollapseTransition from './uiCollapseTransition'
import position from './position'

const Components = {
    uiFormItem,
    uiForm,
    uiAlert,
    uiCarousel,
    uiAccordion,
    uiContainer,
    uiLoading,
    uiSlide,
    uiRow,
    uiColumn,
    uiSwitch,
    uiButton,
    uiButtonGroup,
    uiAffix,
    uiAside,
    uiCheckbox,
    uiCheckboxBtn,
    uiCheckboxGroup,
    uiDatepicker,
    uiTimepicker,
    uiDatetimepicker,
    uiUploader,
    uiCascader,
    uiLabel,
    uiRate,
    uiInput,
    uiTextarea,
    uiDropdown,
    uiModal,
    uiOption,
    uiNav,
    uiSubNav,
    uiNavItem,
    uiNavGroup,
    uiPanel,
    uiInputNumber,
    uiPopover,
    uiPopConfirm,
    uiProgressbar,
    uiProgress,
    uiCard,
    uiRadioGroup,
    uiRadio,
    uiRadioBtn,
    uiSelect,
    uiIcon,
    uiTree,
    uiSlider,
    uiTab,
    uiTimelineItem,
    uiTimeline,
    uiMultipleInput,
    uiTabs,
    uiTooltip,
    uiTypeahead,
    uiPage,
    uiStep,
    uiTags,
    uiDataTable,
    uiBreadcrumb,
    uiBreadcrumbItem,
    uiColorpicker,
    uiCollapseTransition
}

const install = function(Vue, locale) {
    for (let i in Components) {
        Vue.component(i, Components[i])
    }

    Vue.directive('uiPosition', position)
    Vue.prototype.$request = uiRequest
    Vue.prototype.uiModal = uiModalMethod
    Vue.prototype.uiAlert = uiAlertMethod
    Vue.prototype.uiToast = uiToastMethod
    Vue.prototype.uiLocale = locale || 'zh'
    window.uiLocale = locale || 'zh'
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

Components.install = install

export default Components