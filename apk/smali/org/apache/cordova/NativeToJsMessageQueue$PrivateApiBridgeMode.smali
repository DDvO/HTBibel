.class Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;
.super Lorg/apache/cordova/NativeToJsMessageQueue$BridgeMode;
.source "NativeToJsMessageQueue.java"


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lorg/apache/cordova/NativeToJsMessageQueue;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "PrivateApiBridgeMode"
.end annotation


# static fields
.field private static final EXECUTE_JS:I = 0xc2


# instance fields
.field initFailed:Z

.field sendMessageMethod:Ljava/lang/reflect/Method;

.field final synthetic this$0:Lorg/apache/cordova/NativeToJsMessageQueue;

.field webViewCore:Ljava/lang/Object;


# direct methods
.method private constructor <init>(Lorg/apache/cordova/NativeToJsMessageQueue;)V
    .locals 1
    .parameter

    .prologue
    .line 337
    iput-object p1, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->this$0:Lorg/apache/cordova/NativeToJsMessageQueue;

    const/4 v0, 0x0

    invoke-direct {p0, p1, v0}, Lorg/apache/cordova/NativeToJsMessageQueue$BridgeMode;-><init>(Lorg/apache/cordova/NativeToJsMessageQueue;Lorg/apache/cordova/NativeToJsMessageQueue$1;)V

    return-void
.end method

.method synthetic constructor <init>(Lorg/apache/cordova/NativeToJsMessageQueue;Lorg/apache/cordova/NativeToJsMessageQueue$1;)V
    .locals 0
    .parameter "x0"
    .parameter "x1"

    .prologue
    .line 337
    invoke-direct {p0, p1}, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;-><init>(Lorg/apache/cordova/NativeToJsMessageQueue;)V

    return-void
.end method

.method private initReflection()V
    .locals 10

    .prologue
    const/4 v9, 0x1

    .line 349
    iget-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->this$0:Lorg/apache/cordova/NativeToJsMessageQueue;

    #getter for: Lorg/apache/cordova/NativeToJsMessageQueue;->webView:Lorg/apache/cordova/CordovaWebView;
    invoke-static {v4}, Lorg/apache/cordova/NativeToJsMessageQueue;->access$600(Lorg/apache/cordova/NativeToJsMessageQueue;)Lorg/apache/cordova/CordovaWebView;

    move-result-object v3

    .line 350
    .local v3, webViewObject:Lorg/apache/cordova/CordovaWebView;
    const-class v2, Landroid/webkit/WebView;

    .line 352
    .local v2, webViewClass:Ljava/lang/Class;
    :try_start_0
    const-string v4, "mProvider"

    invoke-virtual {v2, v4}, Ljava/lang/Class;->getDeclaredField(Ljava/lang/String;)Ljava/lang/reflect/Field;

    move-result-object v1

    .line 353
    .local v1, f:Ljava/lang/reflect/Field;
    const/4 v4, 0x1

    invoke-virtual {v1, v4}, Ljava/lang/reflect/Field;->setAccessible(Z)V

    .line 354
    iget-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->this$0:Lorg/apache/cordova/NativeToJsMessageQueue;

    #getter for: Lorg/apache/cordova/NativeToJsMessageQueue;->webView:Lorg/apache/cordova/CordovaWebView;
    invoke-static {v4}, Lorg/apache/cordova/NativeToJsMessageQueue;->access$600(Lorg/apache/cordova/NativeToJsMessageQueue;)Lorg/apache/cordova/CordovaWebView;

    move-result-object v4

    invoke-virtual {v1, v4}, Ljava/lang/reflect/Field;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v3

    .line 355
    .local v3, webViewObject:Ljava/lang/Object;
    invoke-virtual {v3}, Ljava/lang/Object;->getClass()Ljava/lang/Class;
    :try_end_0
    .catch Ljava/lang/Throwable; {:try_start_0 .. :try_end_0} :catch_1

    move-result-object v2

    .line 361
    .end local v1           #f:Ljava/lang/reflect/Field;
    .end local v3           #webViewObject:Ljava/lang/Object;
    :goto_0
    :try_start_1
    const-string v4, "mWebViewCore"

    invoke-virtual {v2, v4}, Ljava/lang/Class;->getDeclaredField(Ljava/lang/String;)Ljava/lang/reflect/Field;

    move-result-object v1

    .line 362
    .restart local v1       #f:Ljava/lang/reflect/Field;
    const/4 v4, 0x1

    invoke-virtual {v1, v4}, Ljava/lang/reflect/Field;->setAccessible(Z)V

    .line 363
    invoke-virtual {v1, v3}, Ljava/lang/reflect/Field;->get(Ljava/lang/Object;)Ljava/lang/Object;

    move-result-object v4

    iput-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->webViewCore:Ljava/lang/Object;

    .line 365
    iget-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->webViewCore:Ljava/lang/Object;

    if-eqz v4, :cond_0

    .line 366
    iget-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->webViewCore:Ljava/lang/Object;

    invoke-virtual {v4}, Ljava/lang/Object;->getClass()Ljava/lang/Class;

    move-result-object v4

    const-string v5, "sendMessage"

    const/4 v6, 0x1

    new-array v6, v6, [Ljava/lang/Class;

    const/4 v7, 0x0

    const-class v8, Landroid/os/Message;

    aput-object v8, v6, v7

    invoke-virtual {v4, v5, v6}, Ljava/lang/Class;->getDeclaredMethod(Ljava/lang/String;[Ljava/lang/Class;)Ljava/lang/reflect/Method;

    move-result-object v4

    iput-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->sendMessageMethod:Ljava/lang/reflect/Method;

    .line 367
    iget-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->sendMessageMethod:Ljava/lang/reflect/Method;

    const/4 v5, 0x1

    invoke-virtual {v4, v5}, Ljava/lang/reflect/Method;->setAccessible(Z)V
    :try_end_1
    .catch Ljava/lang/Throwable; {:try_start_1 .. :try_end_1} :catch_0

    .line 373
    .end local v1           #f:Ljava/lang/reflect/Field;
    :cond_0
    :goto_1
    return-void

    .line 369
    :catch_0
    move-exception v0

    .line 370
    .local v0, e:Ljava/lang/Throwable;
    iput-boolean v9, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->initFailed:Z

    .line 371
    const-string v4, "JsMessageQueue"

    const-string v5, "PrivateApiBridgeMode failed to find the expected APIs."

    invoke-static {v4, v5, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    goto :goto_1

    .line 356
    .end local v0           #e:Ljava/lang/Throwable;
    :catch_1
    move-exception v4

    goto :goto_0
.end method


# virtual methods
.method onNativeToJsMessageAvailable()V
    .locals 7

    .prologue
    .line 376
    iget-object v3, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->sendMessageMethod:Ljava/lang/reflect/Method;

    if-nez v3, :cond_0

    iget-boolean v3, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->initFailed:Z

    if-nez v3, :cond_0

    .line 377
    invoke-direct {p0}, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->initReflection()V

    .line 380
    :cond_0
    iget-object v3, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->sendMessageMethod:Ljava/lang/reflect/Method;

    if-eqz v3, :cond_1

    .line 381
    iget-object v3, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->this$0:Lorg/apache/cordova/NativeToJsMessageQueue;

    #calls: Lorg/apache/cordova/NativeToJsMessageQueue;->popAndEncodeAsJs()Ljava/lang/String;
    invoke-static {v3}, Lorg/apache/cordova/NativeToJsMessageQueue;->access$500(Lorg/apache/cordova/NativeToJsMessageQueue;)Ljava/lang/String;

    move-result-object v2

    .line 382
    .local v2, js:Ljava/lang/String;
    const/4 v3, 0x0

    const/16 v4, 0xc2

    invoke-static {v3, v4, v2}, Landroid/os/Message;->obtain(Landroid/os/Handler;ILjava/lang/Object;)Landroid/os/Message;

    move-result-object v1

    .line 384
    .local v1, execJsMessage:Landroid/os/Message;
    :try_start_0
    iget-object v3, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->sendMessageMethod:Ljava/lang/reflect/Method;

    iget-object v4, p0, Lorg/apache/cordova/NativeToJsMessageQueue$PrivateApiBridgeMode;->webViewCore:Ljava/lang/Object;

    const/4 v5, 0x1

    new-array v5, v5, [Ljava/lang/Object;

    const/4 v6, 0x0

    aput-object v1, v5, v6

    invoke-virtual {v3, v4, v5}, Ljava/lang/reflect/Method;->invoke(Ljava/lang/Object;[Ljava/lang/Object;)Ljava/lang/Object;
    :try_end_0
    .catch Ljava/lang/Throwable; {:try_start_0 .. :try_end_0} :catch_0

    .line 389
    .end local v1           #execJsMessage:Landroid/os/Message;
    .end local v2           #js:Ljava/lang/String;
    :cond_1
    :goto_0
    return-void

    .line 385
    .restart local v1       #execJsMessage:Landroid/os/Message;
    .restart local v2       #js:Ljava/lang/String;
    :catch_0
    move-exception v0

    .line 386
    .local v0, e:Ljava/lang/Throwable;
    const-string v3, "JsMessageQueue"

    const-string v4, "Reflection message bridge failed."

    invoke-static {v3, v4, v0}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Throwable;)I

    goto :goto_0
.end method
