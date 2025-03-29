<template>
  <div class="test-container">
    <h2>Form 表单组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-form
        class="form-container"
        :model="basicForm"
        :rules="basicRules"
        ref="basicFormRef"
        :onSubmit="handleBasicSubmit"
        :onReset="handleBasicReset"
      >
        <t-form-item label="用户名" prop="username" tip="请输入您的用户名">
          <t-input v-model="basicForm.username" />
        </t-form-item>
        <t-form-item label="密码" prop="password" tip="请输入您的登录密码">
          <t-input v-model="basicForm.password" password />
        </t-form-item>
      </t-form>

      <div class="form-result" v-if="basicFormSubmitted">提交的数据: {{ JSON.stringify(basicForm) }}</div>
    </test-section>

    <!-- 行内表单 -->
    <test-section title="行内表单">
      <t-form class="form-container" :model="inlineForm" inline :showDefaultFooter="false" label-position="left">
        <t-form-item label="用户名">
          <t-input v-model="inlineForm.username" placeholder="请输入用户名" />
        </t-form-item>
        <t-form-item label="邮箱">
          <t-input v-model="inlineForm.email" placeholder="请输入邮箱" />
        </t-form-item>
        <t-form-item>
          <t-button type="primary">查询</t-button>
        </t-form-item>
      </t-form>
    </test-section>

    <!-- 标签位置 -->
    <test-section title="标签位置">
      <div class="position-demo">
        <div class="position-item">
          <h4>右对齐 (默认)</h4>
          <t-form class="form-container" :model="positionForm" label-width="80px" :showDefaultFooter="false">
            <t-form-item label="用户名">
              <t-input v-model="positionForm.username" />
            </t-form-item>
            <t-form-item label="邮箱">
              <t-input v-model="positionForm.email" />
            </t-form-item>
          </t-form>
        </div>

        <div class="position-item">
          <h4>左对齐</h4>
          <t-form
            class="form-container"
            :model="positionForm"
            label-width="80px"
            label-position="left"
            :showDefaultFooter="false"
          >
            <t-form-item label="用户名">
              <t-input v-model="positionForm.username" />
            </t-form-item>
            <t-form-item label="邮箱">
              <t-input v-model="positionForm.email" />
            </t-form-item>
          </t-form>
        </div>

        <div class="position-item">
          <h4>顶部对齐</h4>
          <t-form class="form-container" :model="positionForm" label-position="top" :showDefaultFooter="false">
            <t-form-item label="用户名" tip="123">
              <t-input v-model="positionForm.username" />
            </t-form-item>
            <t-form-item label="邮箱">
              <t-input v-model="positionForm.email" />
            </t-form-item>
          </t-form>
        </div>
      </div>
    </test-section>

    <!-- 表单验证 -->
    <test-section title="表单验证">
      <t-form
        class="form-container"
        :model="validateForm"
        :rules="validateRules"
        ref="validateFormRef"
        submitText="验证并提交"
        resetText="清空表单"
        :onSubmit="handleValidateSubmit"
        :onReset="handleValidateReset"
      >
        <t-form-item label="名称" prop="name" tip="请输入2-20个字符的名称，支持中文、英文、数字">
          <t-input v-model="validateForm.name" />
        </t-form-item>
        <t-form-item label="年龄" prop="age" tip="请输入1-120之间的有效年龄">
          <t-input-number v-model="validateForm.age" :min="0" :max="120" />
        </t-form-item>
        <t-form-item label="邮箱" prop="email" tip="请输入有效的电子邮箱地址，如：example@domain.com">
          <t-input v-model="validateForm.email" />
        </t-form-item>
      </t-form>

      <div class="validation-result" v-if="validateFormResult">
        {{ validateFormResult }}
      </div>
    </test-section>

    <!-- 自定义校验规则 -->
    <test-section title="自定义校验规则">
      <t-form
        class="form-container"
        :model="customForm"
        :rules="customRules"
        ref="customFormRef"
        submitText="确认提交"
        :onSubmit="handleCustomSubmit"
      >
        <t-form-item label="密码" prop="password" tip="密码长度至少6个字符">
          <t-input v-model="customForm.password" password />
        </t-form-item>
        <t-form-item label="确认密码" prop="confirmPassword" tip="请再次输入相同的密码">
          <t-input v-model="customForm.confirmPassword" password />
        </t-form-item>
      </t-form>
    </test-section>

    <!-- 嵌套对象属性表单 -->
    <test-section title="嵌套对象属性表单">
      <t-form
        :model="nestedForm"
        :rules="nestedRules"
        ref="nestedFormRef"
        labelWidth="100px"
        submitText="提交信息"
        :onSubmit="handleNestedSubmit"
      >
        <t-form-item label="姓名" prop="name" tip="请输入您的真实姓名">
          <t-input v-model="nestedForm.name" placeholder="请输入姓名" />
        </t-form-item>

        <div class="nested-form-title">个人信息</div>

        <t-form-item label="年龄" prop="profile.age" tip="请输入您的真实年龄">
          <t-input-number v-model="nestedForm.profile.age" :min="1" :max="120" />
        </t-form-item>

        <t-form-item label="手机号码" prop="profile.phone" tip="请输入11位手机号码">
          <t-input v-model="nestedForm.profile.phone" placeholder="请输入手机号码" />
        </t-form-item>

        <div class="nested-form-title">地址信息</div>

        <t-form-item label="省份" prop="profile.address.province" tip="请选择您所在的省份">
          <t-input v-model="nestedForm.profile.address.province" placeholder="请输入省份" />
        </t-form-item>

        <t-form-item label="城市" prop="profile.address.city" tip="请选择您所在的城市">
          <t-input v-model="nestedForm.profile.address.city" placeholder="请输入城市" />
        </t-form-item>

        <t-form-item label="详细地址" prop="profile.address.detail" tip="请输入详细地址信息">
          <t-input v-model="nestedForm.profile.address.detail" placeholder="请输入详细地址" />
        </t-form-item>
      </t-form>

      <div class="nested-form-result" v-if="nestedFormSubmitted">
        <h4>提交的嵌套表单数据:</h4>
        <pre>{{ JSON.stringify(nestedForm, null, 2) }}</pre>
      </div>
    </test-section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import TestSection from "../components/test-section.vue";
import { TForm, TFormItem } from "@/packages/form";
import { TInput } from "@/packages/input";
import { TInputNumber } from "@/packages/input-number";
import { TButton } from "@/packages/button";
import type { FormItemRule, FormItemTrigger } from "@/packages/form/form";
import type { TFormType } from "@/packages/form";

defineOptions({ name: "FormTest" });

// 基础表单
const basicFormRef = ref<TFormType>();
const basicForm = reactive({
  username: "",
  password: ""
});

const basicRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" as FormItemTrigger }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" as FormItemTrigger }]
} as Record<string, FormItemRule[]>;

const basicFormSubmitted = ref(false);

const handleBasicSubmit = async () => {
  basicFormSubmitted.value = true;
  // 实际应用中这里可能会有API调用
};

const handleBasicReset = () => {
  basicFormSubmitted.value = false;
};

// 行内表单
const inlineForm = reactive({
  username: "",
  email: ""
});

// 标签位置表单
const positionForm = reactive({
  username: "",
  email: ""
});

// 表单验证
const validateFormRef = ref<TFormType>();
const validateForm = reactive({
  name: "",
  age: 18,
  email: ""
});

const validateRules = {
  name: [
    { required: true, message: "请输入名称", trigger: "blur" as FormItemTrigger },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" as FormItemTrigger }
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "change" as FormItemTrigger },
    {
      validator: (val: any) => Number(val) > 0 && Number(val) <= 120,
      message: "年龄必须在 1-120 之间",
      trigger: "change" as FormItemTrigger
    }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" as FormItemTrigger },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "请输入正确的邮箱格式",
      trigger: "blur" as FormItemTrigger
    }
  ]
} as Record<string, FormItemRule[]>;

const validateFormResult = ref("");

const handleValidateSubmit = async () => {
  validateFormResult.value = "验证通过!";
};

const handleValidateReset = () => {
  validateFormResult.value = "";
};

// 自定义校验规则
const customFormRef = ref<TFormType>();
const customForm = reactive({
  password: "",
  confirmPassword: ""
});

// 密码确认校验
const validatePassword = (value: string) => {
  if (value === "") {
    return "请输入密码";
  }
  if (value.length < 6) {
    return "密码不能少于6个字符";
  }
  return true;
};

const validateConfirmPassword = (value: string) => {
  if (value === "") {
    return "请确认密码";
  }
  if (value !== customForm.password) {
    return "两次输入密码不一致";
  }
  return true;
};

const customRules = {
  password: [
    { required: true, message: "请输入密码", trigger: "blur" as FormItemTrigger },
    { validator: validatePassword, trigger: "blur" as FormItemTrigger }
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" as FormItemTrigger },
    { validator: validateConfirmPassword, trigger: "blur" as FormItemTrigger }
  ]
} as Record<string, FormItemRule[]>;

const handleCustomSubmit = async () => {
  alert("密码设置成功");
  customFormRef.value?.resetFields();
};

// 嵌套对象表单
const nestedFormRef = ref<TFormType>();
const nestedForm = reactive({
  name: "",
  profile: {
    age: 18,
    phone: "",
    address: {
      province: "",
      city: "",
      detail: ""
    }
  }
});

const nestedRules = {
  name: [{ required: true, message: "请输入姓名", trigger: "blur" as FormItemTrigger }],
  "profile.age": [
    { required: true, message: "请输入年龄", trigger: "change" as FormItemTrigger },
    {
      validator: (val: number) => val >= 1 && val <= 120,
      message: "年龄必须在1-120之间",
      trigger: "change" as FormItemTrigger
    }
  ],
  "profile.phone": [
    { required: true, message: "请输入手机号码", trigger: "blur" as FormItemTrigger },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号码",
      trigger: "blur" as FormItemTrigger
    }
  ],
  "profile.address.province": [{ required: true, message: "请输入省份", trigger: "blur" as FormItemTrigger }],
  "profile.address.city": [{ required: true, message: "请输入城市", trigger: "blur" as FormItemTrigger }],
  "profile.address.detail": [{ required: true, message: "请输入详细地址", trigger: "blur" as FormItemTrigger }]
} as Record<string, FormItemRule[]>;

const nestedFormSubmitted = ref(false);

const handleNestedSubmit = async () => {
  nestedFormSubmitted.value = true;
};
</script>

<style lang="scss" scoped>
.form-container {
  width: 460px !important;
}
.test-container {
  padding: 24px;

  h2 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 28px;
    color: #1f2937;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 12px;
  }

  .form-result,
  .validation-result {
    width: 460px;
    margin: 16px auto;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
  }

  .position-demo {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 20px;

    .position-item {
      flex: 1;
      min-width: 250px;

      h4 {
        margin-bottom: 10px;
        font-weight: 500;
        color: #555;
      }

      :deep(.t-form) {
        margin: 0;
      }
    }
  }

  :deep(.t-button) {
    margin-right: 10px;
  }

  .nested-form-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin: 16px 0 8px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #e0e0e0;
  }

  .nested-form-result {
    margin-top: 20px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid #42b983;

    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #333;
      font-size: 16px;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
      font-family: monospace;
      font-size: 14px;
      color: #333;
      background-color: #fff;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #eee;
    }
  }
}
</style>
