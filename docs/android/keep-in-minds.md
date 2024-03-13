### Vector drawables

Vector drawables (svg as xml) were introduced in API 21. If your minSdk is lower than 21, then the vector drawables are also converted to pngs during build process so that they can run on older devices as well. So, use androidx support library to do this for you

1. **Step 1**: Add the following to the app's build.gradle file

```kotlin
android {
  defaultConfig {
    vectorDrawables.useSupportLibrary = true
  }
  buildFeatures {
    databinding = true
  }
}
```

1. **Step 2**: Add an app namespace to the layout

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    >
    <!-- ... -->
</LinearLayout>
```

1. **Step 3**: Replace `android:src` with `app:srcCompat` in `ImageView`
