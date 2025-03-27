<template>
  <div class="test-container">
    <h2>Form 表单组件</h2>

    <!-- 基础用法 -->
    <test-section title="基础用法">
      <t-form :model="basicForm" :rules="basicRules" ref="basicFormRef">
        <t-form-item label="用户名" prop="username">
          <t-input v-model="basicForm.username" />
        </t-form-item>
        <t-form-item label="密码" prop="password">
          <t-input v-model="basicForm.password" password />
        </t-form-item>
        <t-form-item>
          <t-button type="primary" @click="submitBasicForm">提交</t-button>
          <t-button @click="resetBasicForm" style="margin-left: 10px">重置</t-button>
        </t-form-item>
      </t-form>

      <div class="form-result" v-if="basicFormSubmitted">提交的数据: {{ JSON.stringify(basicForm) }}</div>
    </test-section>

    <!-- 行内表单 -->
    <test-section title="行内表单">
      <t-form :model="inlineForm" inline>
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
          <t-form :model="positionForm" label-width="80px">
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
          <t-form :model="positionForm" label-width="80px" label-position="left">
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
          <t-form :model="positionForm" label-position="top">
            <t-form-item label="用户名">
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
      <t-form :model="validateForm" :rules="validateRules" ref="validateFormRef">
        <t-form-item label="名称" prop="name">
          <t-input v-model="validateForm.name" />
        </t-form-item>
        <t-form-item label="年龄" prop="age">
          <t-input-number v-model="validateForm.age" :min="0" :max="120" />
        </t-form-item>
        <t-form-item label="邮箱" prop="email">
          <t-input v-model="validateForm.email" />
        </t-form-item>
        <t-form-item>
          <t-button type="primary" @click="submitValidateForm">提交</t-button>
          <t-button @click="resetValidateForm" style="margin-left: 10px">重置</t-button>
        </t-form-item>
      </t-form>

      <div class="validation-result" v-if="validateFormResult">
        {{ validateFormResult }}
      </div>
    </test-section>

    <!-- 自定义校验规则 -->
    <test-section title="自定义校验规则">
      <t-form :model="customForm" :rules="customRules" ref="customFormRef">
        <t-form-item label="密码" prop="password">
          <t-input v-model="customForm.password" password />
        </t-form-item>
        <t-form-item label="确认密码" prop="confirmPassword">
          <t-input v-model="customForm.confirmPassword" password />
        </t-form-item>
        <t-form-item>
          <t-button type="primary" @click="submitCustomForm">提交</t-button>
        </t-form-item>
      </t-form>
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

const submitBasicForm = () => {
  if (!basicFormRef.value) return;
  basicFormRef.value.validate(valid => {
    if (valid) {
      basicFormSubmitted.value = true;
      // 实际应用中这里可能会有API调用
    }
  });
};

const resetBasicForm = () => {
  if (!basicFormRef.value) return;
  basicFormRef.value.resetFields();
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

const submitValidateForm = () => {
  if (!validateFormRef.value) return;
  validateFormRef.value.validate(valid => {
    validateFormResult.value = valid ? "验证通过!" : "验证失败，请检查表单填写";
  });
};

const resetValidateForm = () => {
  if (!validateFormRef.value) return;
  validateFormRef.value.resetFields();
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

const submitCustomForm = () => {
  if (!customFormRef.value) return;
  customFormRef.value.validate(valid => {
    if (valid) {
      alert("密码设置成功");
      customFormRef.value!.resetFields();
    }
  });
};
</script>

<style lang="scss" scoped>
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
    margin-top: 16px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
  }

  .position-demo {
    display: flex;
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
    }
  }

  :deep(.t-button) {
    margin-right: 10px;
  }
}
</style>
