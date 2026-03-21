# Vue 3 Chuyên Sâu: Ngắn Gọn, Dễ Nhớ, Dễ Áp Dụng

## 1) Tư duy cốt lõi của Vue 3
Reactivity :Vue sẽ theo dõi tất cả các thuộc tính được khai báo trong data và tự động cập nhật DOM khi chúng thay đổi. Điều này giúp cho việc xây dựng giao diện người dùng trở nên dễ dàng và hiệu quả hơn.
Refs có thể chứa bất kỳ kiểu giá trị nào, bao gồm các đối tượng lồng nhau sâu, mảng hoặc các cấu trúc dữ liệu tích hợp của JavaScript như Map.
https://vuejs-course.vercel.app/guide/essentials/reactivity-fundamentals.html
```

Vue 3 xoay quanh 3 ý chính:

- Reactive state: khi state đổi, UI tự cập nhật.
- Declarative rendering: mô tả UI cần có, Vue lo phần cập nhật DOM.
- Composition API: tổ chức logic theo tính năng, dễ mở rộng và tái sử dụng.

Bạn thay đổi state, Vue thay đổi DOM.

### 2.2 Attribute binding

```vue
<button :disabled="isDisabled">Click</button>
```

- `v-bind:attr="expr"` có shorthand `:attr="expr"`.
- Mọi thuộc tính HTML đều bind được: `id`, `class`, `style`, `disabled`, `src`...

### 2.3 Event binding

```vue
<button @click="updateText">Click Me</button>
```

- `v-on:click` có shorthand `@click`.
- Có thể truyền tham số: `@click="doSomething(id)"`.

### 2.4 Rendering raw HTML (`v-html`)

```vue
<div v-html="rawHtml"></div>
```

- Vue sẽ chèn chuỗi HTML trực tiếp vào DOM.
- Không dùng với dữ liệu user input chưa sanitize (nguy cơ XSS).
- Ưu tiên template/component thay vì lạm dụng `v-html`.

## 3) Reactivity: `ref` vs `reactive`

### 3.1 `ref()`

Dùng tốt nhất cho biến đơn (primitive), cũng có thể chứa object.

```js
import { ref } from 'vue'

const count = ref(0)
count.value++
```

Đặc điểm:

- Truy cập/gán trong script qua `.value`.
- Trong template: dùng trực tiếp `{{ count }}`.
- Linh hoạt cho mọi kiểu dữ liệu.

### 3.2 `reactive()`

Dùng để tạo object/array reactive.

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
state.count++
```

Đặc điểm:

- Không có `.value`.
- Chỉ dùng cho object/array.
- Deep reactive: nested object vẫn được track.

### 3.3 Chọn cái nào?

- Biến đơn lẻ (number, string, boolean): ưu tiên `ref`.
- State object lớn có nhiều field liên quan: có thể dùng `reactive`.
- Thực tế team Vue 3 thường nghiêng về `ref` nhiều hơn vì dễ kiểm soát, dễ destructure an toàn hơn (với `toRefs` khi cần).


## 4) Deep Reactivity: hiểu đúng để tránh bug

Vue theo dõi thay đổi sâu bên trong object/array:

```js
const user = ref({ profile: { name: 'A' } })
user.value.profile.name = 'B' // UI vẫn update
```

Lưu ý:

- Reactive không đồng nghĩa bất đồng bộ.
- DOM update là bất đồng bộ theo chu kỳ render (batch update).

## 5) `nextTick()`: khi nào cần, khi nào không

Sau khi đổi state, Vue chưa chắc đã patch DOM ngay lập tức. Cần đọc/tương tác DOM ngay sau đó thì dùng `nextTick`.

```js
import { ref, nextTick } from 'vue'

const show = ref(false)

async function openModal() {
  show.value = true
  await nextTick()
  document.querySelector('.modal')?.focus()
}
```

Nên dùng `nextTick` khi:

- Cần đọc text/kích thước/vị trí element ngay sau update state.
- Cần focus, scroll, đo layout sau khi component render xong.

Không nên dùng `nextTick` nếu:

- Chỉ cập nhật data thông thường.
- Không cần đọc/ghi trực tiếp DOM.

## 6) Lỗi phổ biến cần tránh

- Dùng sai `reactive` với primitive:

```js
const count = reactive(0) // Sai
```

- Quên `.value` trong script khi dùng `ref`:

```js
count++ // Sai nếu count là ref
```

- Làm việc với DOM quá sớm mà không `nextTick`.
- Lạm dụng `v-html` với dữ liệu không an toàn.

## 7) Mẫu thực hành tốt cho component nhỏ

```vue
<script setup>
import { ref } from 'vue'

const text = ref('Hello Vue 3!')
const btnDisabled = ref(false)

function updateText() {
  text.value = text.value === 'Text updated!' ? 'Hello Vue 3!' : 'Text updated!'
}
</script>

<template>
  <button :disabled="btnDisabled" @click="updateText">Click Me</button>
  <h1>{{ text }}</h1>
</template>
```

Tại sao mẫu này tốt:

- State đơn giản dùng `ref`.
- Logic ngắn gọn, dễ test.
- Template dễ đọc, không đưa quá nhiều HTML string vào `v-html`.

## 8) Checklist nhanh trước khi merge

- State này nên là `ref` hay `reactive`?
- Trong script đã dùng `.value` đúng cho `ref` chưa?
- Có thao tác DOM ngay sau update state không? Nếu có, cần `await nextTick()`.
- Có sử dụng `v-html` không? Nếu có, đã sanitize dữ liệu chưa?
- Component có dễ đọc, dễ maintain sau 3 tháng nữa không?

## 9) Rule thực chiến dễ nhớ

- Ưu tiên `ref` cho đa số trường hợp.
- Dùng `reactive` khi state object liên kết chặt chẽ.
- Dùng `nextTick` chỉ khi cần đụng vào DOM sau render.
- Giữ template sạch, hạn chế string HTML lớn trong script.

Nếu cần, bạn có thể tách tài liệu này thành 3 phần để học nhanh:

- Cơ bản: Template syntax + ref.
- Trung cấp: reactive + deep reactivity.
- Nâng cao: nextTick + quản lý thao tác DOM + clean architecture component.