import { defineStore } from "pinia"
import { router } from "@inertiajs/vue3"

export const useApplicationStore = defineStore("application", {
  state: () => ({
    currentStep: 1,
    totalSteps: 5,

    // Step 1: Login
    loginData: {
      email: "",
      password: "",
    },

    // Step 2: User Information
    userInfo: {
      firstName: "",
      lastName: "",
      contactEmail: "",
      mobilePhone: "",
      officePhone: "",
      whatsappPhone: "",
      isLegalRepresentative: false,
    },

    // Step 3: Company Information
    companyInfo: {
      companyName: "",
      nif: "",
      companyType: "",
      isStartup: null,
      cenaeCode: "",
      address: "",
      phones: "",
      yearStarted: "",
      hadProfitsLastYear: null,
      hasUnpaidDebts: null,
      numberOfEmployees: "",
      description: "",
    },

    // Step 4: Credit Application
    creditApplication: {
      financingTypes: [],
      requestedAmount: 50000,
      termMonths: 12,
      useOfFunds: "",
      uploadedFiles: [],
      partnerGuarantee: null,
      operatingBanks: [],
      appliedToBanks: false,
      appliedBanksList: [],
      excludedBanks: [],
      fundsNeededDate: null,
    },

    // Form validation errors
    errors: {},

    // Loading states
    isLoading: false,
    isSubmitting: false,
  }),

  getters: {
    canProceedToNext: (state) => {
      switch (state.currentStep) {
        case 1:
          return state.loginData.email && state.loginData.password
        case 2:
          return (
            state.userInfo.firstName &&
            state.userInfo.lastName &&
            state.userInfo.contactEmail &&
            state.userInfo.mobilePhone
          )
        case 3:
          return state.companyInfo.companyName && state.companyInfo.nif && state.companyInfo.companyType
        case 4:
          return state.creditApplication.financingTypes.length > 0 && state.creditApplication.requestedAmount >= 50000
        default:
          return true
      }
    },

    progressPercentage: (state) => {
      return (state.currentStep / state.totalSteps) * 100
    },
  },

  actions: {
    nextStep() {
      if (this.currentStep < this.totalSteps && this.canProceedToNext) {
        this.currentStep++
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    setStep(step) {
      if (step >= 1 && step <= this.totalSteps) {
        this.currentStep = step
      }
    },

    async login() {
      this.isLoading = true
      try {
        await router.post("/login", this.loginData)
        this.nextStep()
      } catch (error) {
        this.errors = error.response?.data?.errors || {}
      } finally {
        this.isLoading = false
      }
    },

    async saveUserInfo() {
      this.isLoading = true
      try {
        await router.post("/user-info", this.userInfo)
        this.nextStep()
      } catch (error) {
        this.errors = error.response?.data?.errors || {}
      } finally {
        this.isLoading = false
      }
    },

    async saveCompanyInfo() {
      this.isLoading = true
      try {
        await router.post("/company-info", this.companyInfo)
        this.nextStep()
      } catch (error) {
        this.errors = error.response?.data?.errors || {}
      } finally {
        this.isLoading = false
      }
    },

    async submitApplication() {
      this.isSubmitting = true
      try {
        await router.post("/credit-application", this.creditApplication)
        this.nextStep()
      } catch (error) {
        this.errors = error.response?.data?.errors || {}
      } finally {
        this.isSubmitting = false
      }
    },

    clearErrors() {
      this.errors = {}
    },
  },
})
