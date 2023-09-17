import { useState, useCallback } from "react"

const useForm = () => {
  // введенные инпуты
  const [inputValues, setInputValues] = useState({})
  // ошибки валидации инпутов
  const [errors, setErrors] = useState({})
  // валидность формы
  const [isFormValid, setIsFormValid] = useState(false)

  // изменение инпутов
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

  // изменение ошибок
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

  // валидность
    setIsFormValid(event.target.closest("#form").checkValidity())
  }

  // установка новых значений
  const updateForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setInputValues(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsFormValid)
    },
    [setInputValues, setErrors, setIsFormValid]
  )

  return {
    inputValues,
    handleChangeInput,
    isFormValid,
    errors,
    updateForm,
  }
}

export default useForm
