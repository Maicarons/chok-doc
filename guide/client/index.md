# Flutter Client Guide

The CHOKAPP client is built with Flutter and GetX, targeting 6 platforms with responsive UI.

## Architecture

The client follows a clean GetX architecture:

```
Controller -> Service -> API
     ↓
   Model
     ↓
   View (Widget)
```

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `get` | State management, dependency injection, navigation |
| `dio` | HTTP client for API calls |
| `cached_network_image` | Image caching and loading |
| `flutter_markdown` | Markdown rendering for app descriptions |
| `url_launcher` | Opening external download links |
| `shimmer` | Loading skeleton animations |

## State Management

All state management uses GetX reactive variables:

```dart
class HomeController extends GetxController {
  final hotApps = <AppModel>[].obs;   // Reactive list
  final isLoading = true.obs;          // Reactive bool

  @override
  void onInit() {
    super.onInit();
    loadData();
  }

  Future<void> loadData() async {
    isLoading.value = true;
    try {
      hotApps.value = (await _api.getHotApps())
          .map((e) => AppModel.fromJson(e))
          .toList();
    } finally {
      isLoading.value = false;
    }
  }
}
```

## Dependency Injection

All services and controllers are registered with GetX:

```dart
// In main.dart
await Get.putAsync(() => ApiService().init());
Get.put(LocaleService());
```

## Pages

- **Home**: Hot apps grid, latest apps grid, collections carousel
- **Ranking**: Weekly/monthly/all-time rankings with filter chips
- **App Detail**: Hero header, screenshots, downloads, markdown, report
- **Settings**: Language switch, data sync, cache clear, about
