import { inject, provide, reactive, type InjectionKey } from 'vue'

export interface FormValuesMap {
  [compId: string]: any
}

const FORM_VALUES_KEY: InjectionKey<FormValuesMap> = Symbol('formValues')

/** Preview root provides this; child components inject to write their live value */
export const provideFormValues = (): FormValuesMap => {
  const map = reactive<FormValuesMap>({})
  provide(FORM_VALUES_KEY, map)
  return map
}

/** Call inside a leaf component to get the shared map and write values into it */
export const useFormValues = (): FormValuesMap | null => {
  return inject(FORM_VALUES_KEY, null)
}
