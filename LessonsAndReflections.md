# Lessons and reflections about this project

## The look and feel

Initially, i just wanted to have a minimal layout and keep the app's visual as close to native as possible.
I needed to choose and install a components library for achieving that look, but i choose to prioritize functionality instead.
After some commits, the app started to take its own form. I like rounded shapes and soft colors.
At this point, applying some standardized theme seemed boring.
It could change in the future, tough.

## iOS policies are too restrictive

The most essential feature of this app is triggering multiple alarms reliably.
For that to happen, the app needs to run background jobs and trigger specific code when the timer reaches zero, even if the app is already closed.
Of course it requires extra permissions, but it is not an obstacle.

From my brief research, it seems that Apple does not provide a reliable way for having the background job or scheduling a call to the app.
Is is also not possible to pin a notification that the user cannot swipe away.
The app would need a special permission for "Critical Alert" that is requested from Apple website.
This restrictions begin to break the UX consistency of the app, turning it into an "alarm that works if you keep looking to it".
My initial goal was to support both Android and iOS, but now i'm reconsidering.
