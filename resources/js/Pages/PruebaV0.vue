<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow-sm py-6 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-purple-600">Lemi</h1>
            <p class="text-sm text-gray-500">Financial solutions for SMEs</p>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-8">
      <div
        class="max-w-4xl mx-auto bg-purple-500 rounded-lg shadow-md border border-gray-200 overflow-hidden"
      >
        <!-- Progress bar -->
        <div class="px-8 pt-8">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
            ></div>
          </div>
          <div class="flex justify-between mt-3 text-xs font-medium">
            <span
              :class="currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'"
              >Login</span
            >
            <span
              :class="currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'"
              >User Info</span
            >
            <span
              :class="currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'"
              >Company</span
            >
            <span
              :class="currentStep >= 4 ? 'text-purple-600' : 'text-gray-400'"
              >Credit</span
            >
            <span
              :class="currentStep >= 5 ? 'text-purple-600' : 'text-gray-400'"
              >Complete</span
            >
          </div>
        </div>

        <!-- Form content -->
        <div class="p-8">
          <Transition name="slide-fade" mode="out-in">
            <!-- Step 1: Login -->
            <div v-if="currentStep === 1" key="login" class="space-y-8">
              <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-800">Welcome back</h2>
                <p class="text-gray-600 mt-2">
                  Sign in to continue your financing application
                </p>
              </div>

              <div class="max-w-md mx-auto space-y-6">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Email Address</label
                  >
                  <input
                    id="email"
                    v-model="formData.login.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="your@email.com"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.login.email,
                    }"
                  />
                  <p
                    v-if="errors.login.email"
                    class="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ errors.login.email }}
                  </p>
                </div>

                <div>
                  <label
                    for="password"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Password</label
                  >
                  <input
                    id="password"
                    v-model="formData.login.password"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="••••••••"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.login.password,
                    }"
                  />
                  <p
                    v-if="errors.login.password"
                    class="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ errors.login.password }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2: User Information -->
            <div
              v-else-if="currentStep === 2"
              key="user-info"
              class="space-y-8"
            >
              <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-800">
                  Personal Information
                </h2>
                <p class="text-gray-600 mt-2">Tell us about yourself</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >First Name</label
                  >
                  <input
                    id="firstName"
                    v-model="formData.userInfo.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="John"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.userInfo.firstName,
                    }"
                  />
                  <p
                    v-if="errors.userInfo.firstName"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.userInfo.firstName }}
                  </p>
                </div>

                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Last Name</label
                  >
                  <input
                    id="lastName"
                    v-model="formData.userInfo.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="Doe"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.userInfo.lastName,
                    }"
                  />
                  <p
                    v-if="errors.userInfo.lastName"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.userInfo.lastName }}
                  </p>
                </div>

                <div>
                  <label
                    for="contactEmail"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Contact Email</label
                  >
                  <input
                    id="contactEmail"
                    v-model="formData.userInfo.contactEmail"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="contact@example.com"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.userInfo.contactEmail,
                    }"
                  />
                  <p
                    v-if="errors.userInfo.contactEmail"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.userInfo.contactEmail }}
                  </p>
                </div>

                <div>
                  <label
                    for="mobilePhone"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Mobile Phone</label
                  >
                  <input
                    id="mobilePhone"
                    v-model="formData.userInfo.mobilePhone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="+34 600 000 000"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.userInfo.mobilePhone,
                    }"
                  />
                  <p
                    v-if="errors.userInfo.mobilePhone"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.userInfo.mobilePhone }}
                  </p>
                </div>

                <div>
                  <label
                    for="officePhone"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Office Phone</label
                  >
                  <input
                    id="officePhone"
                    v-model="formData.userInfo.officePhone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="+34 910 000 000"
                  />
                </div>

                <div>
                  <label
                    for="whatsappPhone"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >WhatsApp Phone</label
                  >
                  <input
                    id="whatsappPhone"
                    v-model="formData.userInfo.whatsappPhone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="+34 600 000 000"
                  />
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div class="flex items-center">
                  <div class="flex items-center h-5">
                    <input
                      id="isLegalRepresentative"
                      v-model="formData.userInfo.isLegalRepresentative"
                      type="checkbox"
                      class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="isLegalRepresentative"
                      class="font-semibold text-gray-700"
                      >I am the legal representative of the company</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Company Information -->
            <div
              v-else-if="currentStep === 3"
              key="company-info"
              class="space-y-8"
            >
              <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-800">
                  Company Information
                </h2>
                <p class="text-gray-600 mt-2">Tell us about your business</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label
                    for="companyName"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Company Name / Business Name</label
                  >
                  <input
                    id="companyName"
                    v-model="formData.companyInfo.companyName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="Lemi Technologies S.L."
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.companyInfo.companyName,
                    }"
                  />
                  <p
                    v-if="errors.companyInfo.companyName"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.companyInfo.companyName }}
                  </p>
                </div>

                <div>
                  <label
                    for="nif"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >NIF (Tax ID)</label
                  >
                  <input
                    id="nif"
                    v-model="formData.companyInfo.nif"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="B12345678"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.companyInfo.nif,
                    }"
                  />
                  <p
                    v-if="errors.companyInfo.nif"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.companyInfo.nif }}
                  </p>
                </div>

                <div>
                  <label
                    for="companyType"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Company Type</label
                  >
                  <select
                    id="companyType"
                    v-model="formData.companyInfo.companyType"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.companyInfo.companyType,
                    }"
                  >
                    <option value="">Select company type</option>
                    <option value="SA">Sociedad Anónima (S.A.)</option>
                    <option value="SL">Sociedad Limitada (S.L.)</option>
                  </select>
                  <p
                    v-if="errors.companyInfo.companyType"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.companyInfo.companyType }}
                  </p>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <span class="block text-sm font-semibold text-gray-700 mb-3"
                    >Is it a Startup?</span
                  >
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center">
                      <input
                        id="startupYes"
                        v-model="formData.companyInfo.isStartup"
                        type="radio"
                        :value="true"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label
                        for="startupYes"
                        class="ml-2 text-sm font-medium text-gray-700"
                        >Yes</label
                      >
                    </div>
                    <div class="flex items-center">
                      <input
                        id="startupNo"
                        v-model="formData.companyInfo.isStartup"
                        type="radio"
                        :value="false"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label
                        for="startupNo"
                        class="ml-2 text-sm font-medium text-gray-700"
                        >No</label
                      >
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    for="cenaeCode"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >CENAE Activity Code</label
                  >
                  <select
                    id="cenaeCode"
                    v-model="formData.companyInfo.cenaeCode"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select CENAE code</option>
                    <option value="6201">
                      6201 - Computer programming activities
                    </option>
                    <option value="6202">
                      6202 - Computer consultancy activities
                    </option>
                    <option value="6209">
                      6209 - Other IT service activities
                    </option>
                    <option value="7022">7022 - Business consultancy</option>
                  </select>
                </div>

                <div class="md:col-span-2">
                  <label
                    for="companyAddress"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Company Address</label
                  >
                  <input
                    id="companyAddress"
                    v-model="formData.companyInfo.companyAddress"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="Calle Gran Vía 1, 28013 Madrid"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.companyInfo.companyAddress,
                    }"
                  />
                  <p
                    v-if="errors.companyInfo.companyAddress"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.companyInfo.companyAddress }}
                  </p>
                </div>

                <div>
                  <label
                    for="companyPhone"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Company Phone</label
                  >
                  <input
                    id="companyPhone"
                    v-model="formData.companyInfo.companyPhone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="+34 910 000 000"
                  />
                </div>

                <div>
                  <label
                    for="yearStarted"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Year Business Started</label
                  >
                  <input
                    id="yearStarted"
                    v-model="formData.companyInfo.yearStarted"
                    type="number"
                    min="1900"
                    :max="new Date().getFullYear()"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="2020"
                  />
                </div>

                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <span class="block text-sm font-semibold text-gray-700 mb-3"
                    >Did it show profits last year?</span
                  >
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center">
                      <input
                        id="profitsYes"
                        v-model="formData.companyInfo.hadProfits"
                        type="radio"
                        :value="true"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label
                        for="profitsYes"
                        class="ml-2 text-sm font-medium text-gray-700"
                        >Yes</label
                      >
                    </div>
                    <div class="flex items-center">
                      <input
                        id="profitsNo"
                        v-model="formData.companyInfo.hadProfits"
                        type="radio"
                        :value="false"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label
                        for="profitsNo"
                        class="ml-2 text-sm font-medium text-gray-700"
                        >No</label
                      >
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <span class="block text-sm font-semibold text-gray-700 mb-3"
                    >Any unpaid debts >90 days?</span
                  >
                  <div class="flex items-center space-x-6">
                    <div class="flex items-center">
                      <input
                        id="debtsYes"
                        v-model="formData.companyInfo.hasUnpaidDebts"
                        type="radio"
                        :value="true"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label
                        for="debtsYes"
                        class="ml-2 text-sm font-medium text-gray-700"
                        >Yes</label
                      >
                    </div>
                    <div class="flex items-center">
                      <input
                        id="debtsNo"
                        v-model="formData.companyInfo.hasUnpaidDebts"
                        type="radio"
                        :value="false"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <label
                        for="debtsNo"
                        class="ml-2 text-sm font-medium text-gray-700"
                        >No</label
                      >
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    for="employees"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Number of Employees</label
                  >
                  <input
                    id="employees"
                    v-model="formData.companyInfo.employees"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    placeholder="10"
                  />
                </div>

                <div class="md:col-span-2">
                  <label
                    for="companyDescription"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Short Company Description</label
                  >
                  <textarea
                    id="companyDescription"
                    v-model="formData.companyInfo.companyDescription"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
                    placeholder="Briefly describe your company's activities and business model"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Step 4: Credit Application -->
            <div
              v-else-if="currentStep === 4"
              key="credit-application"
              class="space-y-8"
            >
              <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-800">
                  Credit Application
                </h2>
                <p class="text-gray-600 mt-2">
                  Let's discuss your financing needs
                </p>
              </div>

              <div class="space-y-8">
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label class="block text-sm font-semibold text-gray-700 mb-4"
                    >Type of Financing</label
                  >
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div
                      class="flex items-center"
                      v-for="(option, index) in financingOptions"
                      :key="index"
                    >
                      <input
                        :id="`financing-${index}`"
                        v-model="formData.creditApplication.financingTypes"
                        type="checkbox"
                        :value="option"
                        class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        :for="`financing-${index}`"
                        class="ml-3 text-sm font-medium text-gray-700"
                        >{{ option }}</label
                      >
                    </div>
                  </div>
                  <div
                    v-if="
                      formData.creditApplication.financingTypes.includes(
                        'Other'
                      )
                    "
                    class="mt-4"
                  >
                    <input
                      v-model="formData.creditApplication.otherFinancingType"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      placeholder="Please specify other financing type"
                    />
                  </div>
                  <p
                    v-if="errors.creditApplication.financingTypes"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.creditApplication.financingTypes }}
                  </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="requestedAmount"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                      >Requested Amount (€)</label
                    >
                    <input
                      id="requestedAmount"
                      v-model="formData.creditApplication.requestedAmount"
                      type="number"
                      min="50000"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      placeholder="50,000"
                      :class="{
                        'border-red-400 focus:border-red-500 focus:ring-red-100':
                          errors.creditApplication.requestedAmount,
                      }"
                    />
                    <p class="mt-1 text-xs text-gray-500">
                      Minimum amount: €50,000
                    </p>
                    <p
                      v-if="errors.creditApplication.requestedAmount"
                      class="mt-2 text-sm text-red-600"
                    >
                      {{ errors.creditApplication.requestedAmount }}
                    </p>
                  </div>

                  <div>
                    <label
                      for="term"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                      >Term in Months</label
                    >
                    <select
                      id="term"
                      v-model="formData.creditApplication.term"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      :class="{
                        'border-red-400 focus:border-red-500 focus:ring-red-100':
                          errors.creditApplication.term,
                      }"
                    >
                      <option value="">Select term</option>
                      <option
                        v-for="month in termOptions"
                        :key="month"
                        :value="month"
                      >
                        {{ month }} months
                      </option>
                    </select>
                    <p
                      v-if="errors.creditApplication.term"
                      class="mt-2 text-sm text-red-600"
                    >
                      {{ errors.creditApplication.term }}
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    for="useOfFunds"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Use of Funds</label
                  >
                  <textarea
                    id="useOfFunds"
                    v-model="formData.creditApplication.useOfFunds"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 resize-none"
                    placeholder="Describe how you plan to use the financing (e.g., working capital, equipment purchase, expansion, etc.)"
                    :class="{
                      'border-red-400 focus:border-red-500 focus:ring-red-100':
                        errors.creditApplication.useOfFunds,
                    }"
                  ></textarea>
                  <p
                    v-if="errors.creditApplication.useOfFunds"
                    class="mt-2 text-sm text-red-600"
                  >
                    {{ errors.creditApplication.useOfFunds }}
                  </p>
                </div>

                <div
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200"
                >
                  <div class="space-y-3">
                    <div
                      class="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <label for="file-upload" class="cursor-pointer">
                        <span
                          class="text-purple-600 font-medium hover:text-purple-700"
                          >Upload files</span
                        >
                        <span class="text-gray-600"> or drag and drop</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          multiple
                          accept=".pdf"
                          @change="handleFileUpload"
                        />
                      </label>
                      <p class="text-sm text-gray-500 mt-1">
                        PDF files up to 10MB each (max 15 files)
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  v-if="formData.creditApplication.files.length > 0"
                  class="mt-4"
                >
                  <p class="text-sm font-semibold text-gray-700 mb-2">
                    Selected files:
                  </p>
                  <div class="space-y-2">
                    <div
                      v-for="(file, index) in formData.creditApplication.files"
                      :key="index"
                      class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                    >
                      <div class="flex items-center space-x-3">
                        <div
                          class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"
                        >
                          <svg
                            class="w-4 h-4 text-red-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-700">{{
                          file.name
                        }}</span>
                      </div>
                      <button
                        type="button"
                        @click="removeFile(index)"
                        class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-center">
                      <div class="flex items-center h-5">
                        <input
                          id="partnerGuarantee"
                          v-model="formData.creditApplication.partnerGuarantee"
                          type="checkbox"
                          class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="partnerGuarantee"
                          class="font-semibold text-gray-700"
                          >Partner guarantee available</label
                        >
                        <p class="text-gray-500 text-xs mt-1">
                          Check if you can provide partner guarantees
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      for="fundsNeededDate"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                      >When do you need the funds?</label
                    >
                    <input
                      id="fundsNeededDate"
                      v-model="formData.creditApplication.fundsNeededDate"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      :min="minDate"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="currentBanks"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Banks you already operate with</label
                  >
                  <select
                    id="currentBanks"
                    v-model="formData.creditApplication.currentBanks"
                    multiple
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                    size="4"
                  >
                    <option
                      v-for="bank in bankOptions"
                      :key="bank"
                      :value="bank"
                      class="py-2"
                    >
                      {{ bank }}
                    </option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500">
                    Hold Ctrl/Cmd to select multiple banks
                  </p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="flex items-center h-5">
                      <input
                        id="hasAppliedToBanks"
                        v-model="formData.creditApplication.hasAppliedToBanks"
                        type="checkbox"
                        class="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="hasAppliedToBanks"
                        class="font-semibold text-gray-700"
                        >Have you applied to any of them for financing?</label
                      >
                    </div>
                  </div>

                  <div
                    v-if="formData.creditApplication.hasAppliedToBanks"
                    class="ml-8"
                  >
                    <label
                      for="appliedBanks"
                      class="block text-sm font-semibold text-gray-700 mb-2"
                      >Which banks have you applied to?</label
                    >
                    <select
                      id="appliedBanks"
                      v-model="formData.creditApplication.appliedBanks"
                      multiple
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                      size="3"
                    >
                      <option
                        v-for="bank in formData.creditApplication.currentBanks"
                        :key="bank"
                        :value="bank"
                        class="py-2"
                      >
                        {{ bank }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    for="excludedBank"
                    class="block text-sm font-semibold text-gray-700 mb-2"
                    >Any bank you prefer NOT to apply to?</label
                  >
                  <select
                    id="excludedBank"
                    v-model="formData.creditApplication.excludedBank"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">None (optional)</option>
                    <option
                      v-for="bank in bankOptions"
                      :key="bank"
                      :value="bank"
                    >
                      {{ bank }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Step 5: Final Screen -->
            <div
              v-else-if="currentStep === 5"
              key="final"
              class="space-y-8 text-center"
            >
              <div
                class="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center"
              >
                <div
                  class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">
                  Almost there!
                </h2>
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                  Now you must complete your company and partner information to
                  send requests to the banks.
                </p>
              </div>

              <div
                class="bg-gray-50 p-8 rounded-lg border border-gray-200 max-w-md mx-auto"
              >
                <h3 class="font-semibold text-gray-800 mb-4">
                  What happens next?
                </h3>
                <div class="space-y-3 text-sm text-gray-600 text-left">
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <span class="text-purple-600 font-bold text-xs">1</span>
                    </div>
                    <span>Complete your detailed company profile</span>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <span class="text-purple-600 font-bold text-xs">2</span>
                    </div>
                    <span>Add partner information and guarantees</span>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div
                      class="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <span class="text-purple-600 font-bold text-xs">3</span>
                    </div>
                    <span>We'll send your application to matching banks</span>
                  </div>
                </div>
              </div>

              <div class="pt-4">
                <button
                  type="button"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                  @click="submitApplication"
                >
                  Complete Profile
                  <svg
                    class="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation buttons -->
        <div
          class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center"
        >
          <button
            v-if="currentStep > 1"
            type="button"
            class="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            @click="prevStep"
          >
            <svg
              class="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            Back
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < totalSteps"
            type="button"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            @click="nextStep"
          >
            Next
            <svg
              class="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="container mx-auto px-4 text-center">
        <p class="text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Lemi Financial Solutions. All
          rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

// Constants
const totalSteps = 5;
const currentStep = ref(1);
const financingOptions = [
  "Credit Line",
  "Loan",
  "Import/Export",
  "Confirming",
  "Invoice Discounting",
  "Leasing",
  "Other",
];
const termOptions = [6, 12, 18, 24, 36, 48, 60, 72, 84, 96, 108, 120];
const bankOptions = [
  "Santander",
  "BBVA",
  "CaixaBank",
  "Sabadell",
  "Bankinter",
  "ING",
  "Deutsche Bank",
  "Abanca",
  "Kutxabank",
  "Ibercaja",
];

// Computed properties
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

// Form data
const formData = reactive({
  login: {
    email: "",
    password: "",
  },
  userInfo: {
    firstName: "",
    lastName: "",
    contactEmail: "",
    mobilePhone: "",
    officePhone: "",
    whatsappPhone: "",
    isLegalRepresentative: false,
  },
  companyInfo: {
    companyName: "",
    nif: "",
    companyType: "",
    isStartup: null,
    cenaeCode: "",
    companyAddress: "",
    companyPhone: "",
    yearStarted: null,
    hadProfits: null,
    hasUnpaidDebts: null,
    employees: null,
    companyDescription: "",
  },
  creditApplication: {
    financingTypes: [],
    otherFinancingType: "",
    requestedAmount: null,
    term: "",
    useOfFunds: "",
    files: [],
    partnerGuarantee: false,
    currentBanks: [],
    hasAppliedToBanks: false,
    appliedBanks: [],
    excludedBank: "",
    fundsNeededDate: "",
  },
});

// Form validation errors
const errors = reactive({
  login: {
    email: "",
    password: "",
  },
  userInfo: {
    firstName: "",
    lastName: "",
    contactEmail: "",
    mobilePhone: "",
  },
  companyInfo: {
    companyName: "",
    nif: "",
    companyType: "",
    companyAddress: "",
  },
  creditApplication: {
    financingTypes: "",
    requestedAmount: "",
    term: "",
    useOfFunds: "",
  },
});

// Methods
const validateCurrentStep = () => {
  let isValid = true;

  // Reset errors for current step
  if (currentStep.value === 1) {
    errors.login.email = "";
    errors.login.password = "";

    // Validate email
    if (!formData.login.email) {
      errors.login.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.login.email)) {
      errors.login.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (!formData.login.password) {
      errors.login.password = "Password is required";
      isValid = false;
    } else if (formData.login.password.length < 6) {
      errors.login.password = "Password must be at least 6 characters";
      isValid = false;
    }
  } else if (currentStep.value === 2) {
    errors.userInfo.firstName = "";
    errors.userInfo.lastName = "";
    errors.userInfo.contactEmail = "";
    errors.userInfo.mobilePhone = "";

    // Validate first name
    if (!formData.userInfo.firstName) {
      errors.userInfo.firstName = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!formData.userInfo.lastName) {
      errors.userInfo.lastName = "Last name is required";
      isValid = false;
    }

    // Validate contact email
    if (!formData.userInfo.contactEmail) {
      errors.userInfo.contactEmail = "Contact email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userInfo.contactEmail)
    ) {
      errors.userInfo.contactEmail = "Please enter a valid email address";
      isValid = false;
    }

    // Validate mobile phone
    if (!formData.userInfo.mobilePhone) {
      errors.userInfo.mobilePhone = "Mobile phone is required";
      isValid = false;
    }
  } else if (currentStep.value === 3) {
    errors.companyInfo.companyName = "";
    errors.companyInfo.nif = "";
    errors.companyInfo.companyType = "";
    errors.companyInfo.companyAddress = "";

    // Validate company name
    if (!formData.companyInfo.companyName) {
      errors.companyInfo.companyName = "Company name is required";
      isValid = false;
    }

    // Validate NIF
    if (!formData.companyInfo.nif) {
      errors.companyInfo.nif = "NIF is required";
      isValid = false;
    }

    // Validate company type
    if (!formData.companyInfo.companyType) {
      errors.companyInfo.companyType = "Company type is required";
      isValid = false;
    }

    // Validate company address
    if (!formData.companyInfo.companyAddress) {
      errors.companyInfo.companyAddress = "Company address is required";
      isValid = false;
    }
  } else if (currentStep.value === 4) {
    errors.creditApplication.financingTypes = "";
    errors.creditApplication.requestedAmount = "";
    errors.creditApplication.term = "";
    errors.creditApplication.useOfFunds = "";

    // Validate financing types
    if (formData.creditApplication.financingTypes.length === 0) {
      errors.creditApplication.financingTypes =
        "Please select at least one financing type";
      isValid = false;
    }

    // Validate requested amount
    if (!formData.creditApplication.requestedAmount) {
      errors.creditApplication.requestedAmount = "Requested amount is required";
      isValid = false;
    } else if (formData.creditApplication.requestedAmount < 50000) {
      errors.creditApplication.requestedAmount = "Minimum amount is €50,000";
      isValid = false;
    }

    // Validate term
    if (!formData.creditApplication.term) {
      errors.creditApplication.term = "Term is required";
      isValid = false;
    }

    // Validate use of funds
    if (!formData.creditApplication.useOfFunds) {
      errors.creditApplication.useOfFunds = "Please describe the use of funds";
      isValid = false;
    }
  }

  return isValid;
};

const nextStep = () => {
  if (validateCurrentStep()) {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);

  // Check if adding these files would exceed the maximum
  if (formData.creditApplication.files.length + files.length > 15) {
    alert("You can upload a maximum of 15 files");
    return;
  }

  // Check file types and sizes
  const validFiles = files.filter((file) => {
    const isValidType = file.type === "application/pdf";
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB

    if (!isValidType) {
      alert(`${file.name} is not a PDF file`);
    }

    if (!isValidSize) {
      alert(`${file.name} exceeds the 10MB size limit`);
    }

    return isValidType && isValidSize;
  });

  // Add valid files to the form data
  formData.creditApplication.files.push(...validFiles);

  // Reset the input
  event.target.value = "";
};

const removeFile = (index) => {
  formData.creditApplication.files.splice(index, 1);
};

const submitApplication = () => {
  // Here you would typically send the data to your backend
  console.log("Form submitted:", formData);
  alert(
    "Application submitted successfully! You will be redirected to complete your profile."
  );
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Custom scrollbar for multi-select */
select[multiple] {
  scrollbar-width: thin;
  scrollbar-color: #a855f7 #f3f4f6;
}

select[multiple]::-webkit-scrollbar {
  width: 6px;
}

select[multiple]::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

select[multiple]::-webkit-scrollbar-thumb {
  background: #a855f7;
  border-radius: 3px;
}

select[multiple]::-webkit-scrollbar-thumb:hover {
  background: #9333ea;
}
</style>