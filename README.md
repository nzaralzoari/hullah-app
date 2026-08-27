# HULLAH — Wear Your Identity

نظام مزدوج الواجهة (React + Vite + Tailwind) لعلامة **HULLAH**: واجهة عملاء (متجر) + لوحة تحكم إدارية (Admin)، تتشاركان حالة واحدة (Context API) بحيث ينعكس أي طلب أو تعديل مخزون فورًا في الطرفين. مُجهّز مسبقًا لتحويله إلى تطبيق أندرويد (APK) عبر **Capacitor**.

## التبديل بين الواجهتين

في أسفل الشاشة يوجد شريط عائم "Customer Store | Admin Dashboard" للتنقل بين واجهة العميل ولوحة الإدارة في نفس التطبيق. أي طلب يتم إتمامه من المتجر (مع الاسم والهاتف والعنوان وطريقة الدفع) يظهر فورًا في تبويب "Orders" بلوحة الإدارة، وأي سلة تُترك دون إتمام شراء لمدة ٢٥ ثانية تُسجَّل تلقائيًا في "Abandoned Carts".

---

## 📁 محتوى المشروع

```
hullah-app/
├── src/
│   ├── components/HullahStore.jsx   ← المتجر بالكامل (الهيدر، المنتجات، السلة...)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── capacitor.config.json
└── .github/workflows/build-apk.yml  ← يبني APK تلقائيًا على GitHub
```

---

## 🚀 الطريقة الأسهل: رفعه على GitHub والحصول على APK تلقائيًا (بدون أي تثبيت على جهازك)

1. أنشئ مستودع (repository) جديد فارغ على GitHub.
2. ارفع محتوى هذا المجلد بالكامل إلى المستودع (يمكنك سحب/إفلات الملفات من واجهة GitHub، أو عبر Git):
   ```bash
   git init
   git add .
   git commit -m "HULLAH store app"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
3. بمجرد الرفع، سيعمل **GitHub Actions** تلقائيًا (الملف موجود في `.github/workflows/build-apk.yml`) وسيقوم بـ:
   - تثبيت الحزم
   - بناء الموقع (build)
   - إنشاء مشروع أندرويد عبر Capacitor
   - بناء ملف **APK** (نسخة Debug)
4. اذهب إلى تبويب **Actions** في المستودع → اختر آخر تشغيل (run) → بعد اكتماله بنجاح، ستجد ملف **hullah-debug-apk** ضمن قسم **Artifacts** — قم بتنزيله وفك الضغط، ستجد بداخله `app-debug.apk` جاهزًا للتثبيت على أي جهاز أندرويد.

> ⏱️ أول تشغيل قد يستغرق 5–10 دقائق لأن Actions يقوم بتثبيت أدوات أندرويد كاملة.

---

## 💻 البناء يدويًا على جهازك (اختياري)

إذا أردت تشغيله وتعديله محليًا قبل الرفع:

```bash
npm install          # تثبيت الحزم
npm run dev          # تشغيل المتجر في المتصفح للمعاينة
npm run build        # بناء نسخة الإنتاج (تُنشئ مجلد dist)

npx cap add android  # إضافة مشروع أندرويد (أول مرة فقط)
npx cap sync android # مزامنة الموقع المبني مع مشروع أندرويد

cd android
./gradlew assembleDebug   # لينكس/ماك
gradlew.bat assembleDebug # ويندوز
```

سيكون ملف الـ APK في:
`android/app/build/outputs/apk/debug/app-debug.apk`

**المتطلبات محليًا:** Node.js 18+، وJDK 17، و Android Studio / Android SDK.

---

## 🏪 نشر التطبيق على متجر Google Play (لاحقًا)

نسخة الـ Debug صالحة فقط للتجربة والتثبيت اليدوي. لنشره على Play Store تحتاج لاحقًا:
- بناء نسخة **Release** موقّعة (`assembleRelease` مع مفتاح توقيع خاص بك)
- إنشاء حساب مطوّر على Google Play Console

يمكنني مساعدتك في هذه الخطوة عند الوصول إليها.

---

## 🎨 تعديل المحتوى

- المنتجات وهمية حاليًا (بيانات تجريبية) في أعلى ملف `src/components/HullahStore.jsx` داخل المصفوفة `PRODUCTS`.
- الشعار مُعاد إنشاؤه بصريًا بـ SVG داخل نفس الملف (`HullahMark` و `HullahWordmark`) لمطابقة شعار HULLAH المرفق.
- الألوان والهوية معرّفة في `tailwind.config.js`.
