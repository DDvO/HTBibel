.class public Lorg/apache/cordova/CordovaChromeClient;
.super Landroid/webkit/WebChromeClient;
.source "CordovaChromeClient.java"


# static fields
.field public static final FILECHOOSER_RESULTCODE:I = 0x1435

.field private static final LOG_TAG:Ljava/lang/String; = "CordovaChromeClient"


# instance fields
.field private MAX_QUOTA:J

.field private TAG:Ljava/lang/String;

.field protected appView:Lorg/apache/cordova/CordovaWebView;

.field protected cordova:Lorg/apache/cordova/CordovaInterface;

.field public mUploadMessage:Landroid/webkit/ValueCallback;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "Landroid/webkit/ValueCallback",
            "<",
            "Landroid/net/Uri;",
            ">;"
        }
    .end annotation
.end field

.field private mVideoProgressView:Landroid/view/View;


# direct methods
.method public constructor <init>(Lorg/apache/cordova/CordovaInterface;)V
    .locals 2
    .parameter "cordova"

    .prologue
    .line 79
    invoke-direct {p0}, Landroid/webkit/WebChromeClient;-><init>()V

    .line 63
    const-string v0, "CordovaLog"

    iput-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->TAG:Ljava/lang/String;

    .line 64
    const-wide/32 v0, 0x6400000

    iput-wide v0, p0, Lorg/apache/cordova/CordovaChromeClient;->MAX_QUOTA:J

    .line 80
    iput-object p1, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    .line 81
    return-void
.end method

.method public constructor <init>(Lorg/apache/cordova/CordovaInterface;Lorg/apache/cordova/CordovaWebView;)V
    .locals 2
    .parameter "ctx"
    .parameter "app"

    .prologue
    .line 89
    invoke-direct {p0}, Landroid/webkit/WebChromeClient;-><init>()V

    .line 63
    const-string v0, "CordovaLog"

    iput-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->TAG:Ljava/lang/String;

    .line 64
    const-wide/32 v0, 0x6400000

    iput-wide v0, p0, Lorg/apache/cordova/CordovaChromeClient;->MAX_QUOTA:J

    .line 90
    iput-object p1, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    .line 91
    iput-object p2, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    .line 92
    return-void
.end method


# virtual methods
.method public getValueCallback()Landroid/webkit/ValueCallback;
    .locals 1
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "()",
            "Landroid/webkit/ValueCallback",
            "<",
            "Landroid/net/Uri;",
            ">;"
        }
    .end annotation

    .prologue
    .line 391
    iget-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->mUploadMessage:Landroid/webkit/ValueCallback;

    return-object v0
.end method

.method public getVideoLoadingProgressView()Landroid/view/View;
    .locals 6

    .prologue
    const/4 v5, -0x2

    .line 351
    iget-object v4, p0, Lorg/apache/cordova/CordovaChromeClient;->mVideoProgressView:Landroid/view/View;

    if-nez v4, :cond_0

    .line 355
    new-instance v2, Landroid/widget/LinearLayout;

    iget-object v4, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    invoke-virtual {v4}, Lorg/apache/cordova/CordovaWebView;->getContext()Landroid/content/Context;

    move-result-object v4

    invoke-direct {v2, v4}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 356
    .local v2, layout:Landroid/widget/LinearLayout;
    const/4 v4, 0x1

    invoke-virtual {v2, v4}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 357
    new-instance v3, Landroid/widget/RelativeLayout$LayoutParams;

    invoke-direct {v3, v5, v5}, Landroid/widget/RelativeLayout$LayoutParams;-><init>(II)V

    .line 358
    .local v3, layoutParams:Landroid/widget/RelativeLayout$LayoutParams;
    const/16 v4, 0xd

    invoke-virtual {v3, v4}, Landroid/widget/RelativeLayout$LayoutParams;->addRule(I)V

    .line 359
    invoke-virtual {v2, v3}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 361
    new-instance v0, Landroid/widget/ProgressBar;

    iget-object v4, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    invoke-virtual {v4}, Lorg/apache/cordova/CordovaWebView;->getContext()Landroid/content/Context;

    move-result-object v4

    invoke-direct {v0, v4}, Landroid/widget/ProgressBar;-><init>(Landroid/content/Context;)V

    .line 362
    .local v0, bar:Landroid/widget/ProgressBar;
    new-instance v1, Landroid/widget/LinearLayout$LayoutParams;

    invoke-direct {v1, v5, v5}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    .line 363
    .local v1, barLayoutParams:Landroid/widget/LinearLayout$LayoutParams;
    const/16 v4, 0x11

    iput v4, v1, Landroid/widget/LinearLayout$LayoutParams;->gravity:I

    .line 364
    invoke-virtual {v0, v1}, Landroid/widget/ProgressBar;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 365
    invoke-virtual {v2, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 367
    iput-object v2, p0, Lorg/apache/cordova/CordovaChromeClient;->mVideoProgressView:Landroid/view/View;

    .line 369
    .end local v0           #bar:Landroid/widget/ProgressBar;
    .end local v1           #barLayoutParams:Landroid/widget/LinearLayout$LayoutParams;
    .end local v2           #layout:Landroid/widget/LinearLayout;
    .end local v3           #layoutParams:Landroid/widget/RelativeLayout$LayoutParams;
    :cond_0
    iget-object v4, p0, Lorg/apache/cordova/CordovaChromeClient;->mVideoProgressView:Landroid/view/View;

    return-object v4
.end method

.method public onConsoleMessage(Ljava/lang/String;ILjava/lang/String;)V
    .locals 5
    .parameter "message"
    .parameter "lineNumber"
    .parameter "sourceID"

    .prologue
    .line 304
    sget v0, Landroid/os/Build$VERSION;->SDK_INT:I

    const/4 v1, 0x7

    if-ne v0, v1, :cond_0

    .line 306
    iget-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->TAG:Ljava/lang/String;

    const-string v1, "%s: Line %d : %s"

    const/4 v2, 0x3

    new-array v2, v2, [Ljava/lang/Object;

    const/4 v3, 0x0

    aput-object p3, v2, v3

    const/4 v3, 0x1

    invoke-static {p2}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v4

    aput-object v4, v2, v3

    const/4 v3, 0x2

    aput-object p1, v2, v3

    invoke-static {v0, v1, v2}, Lorg/apache/cordova/LOG;->d(Ljava/lang/String;Ljava/lang/String;[Ljava/lang/Object;)V

    .line 307
    invoke-super {p0, p1, p2, p3}, Landroid/webkit/WebChromeClient;->onConsoleMessage(Ljava/lang/String;ILjava/lang/String;)V

    .line 309
    :cond_0
    return-void
.end method

.method public onConsoleMessage(Landroid/webkit/ConsoleMessage;)Z
    .locals 5
    .parameter "consoleMessage"
    .annotation build Landroid/annotation/TargetApi;
        value = 0x8
    .end annotation

    .prologue
    .line 315
    invoke-virtual {p1}, Landroid/webkit/ConsoleMessage;->message()Ljava/lang/String;

    move-result-object v0

    if-eqz v0, :cond_0

    .line 316
    iget-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->TAG:Ljava/lang/String;

    const-string v1, "%s: Line %d : %s"

    const/4 v2, 0x3

    new-array v2, v2, [Ljava/lang/Object;

    const/4 v3, 0x0

    invoke-virtual {p1}, Landroid/webkit/ConsoleMessage;->sourceId()Ljava/lang/String;

    move-result-object v4

    aput-object v4, v2, v3

    const/4 v3, 0x1

    invoke-virtual {p1}, Landroid/webkit/ConsoleMessage;->lineNumber()I

    move-result v4

    invoke-static {v4}, Ljava/lang/Integer;->valueOf(I)Ljava/lang/Integer;

    move-result-object v4

    aput-object v4, v2, v3

    const/4 v3, 0x2

    invoke-virtual {p1}, Landroid/webkit/ConsoleMessage;->message()Ljava/lang/String;

    move-result-object v4

    aput-object v4, v2, v3

    invoke-static {v0, v1, v2}, Lorg/apache/cordova/LOG;->d(Ljava/lang/String;Ljava/lang/String;[Ljava/lang/Object;)V

    .line 317
    :cond_0
    invoke-super {p0, p1}, Landroid/webkit/WebChromeClient;->onConsoleMessage(Landroid/webkit/ConsoleMessage;)Z

    move-result v0

    return v0
.end method

.method public onExceededDatabaseQuota(Ljava/lang/String;Ljava/lang/String;JJJLandroid/webkit/WebStorage$QuotaUpdater;)V
    .locals 5
    .parameter "url"
    .parameter "databaseIdentifier"
    .parameter "currentQuota"
    .parameter "estimatedSize"
    .parameter "totalUsedQuota"
    .parameter "quotaUpdater"

    .prologue
    .line 293
    iget-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->TAG:Ljava/lang/String;

    const-string v1, "onExceededDatabaseQuota estimatedSize: %d  currentQuota: %d  totalUsedQuota: %d"

    const/4 v2, 0x3

    new-array v2, v2, [Ljava/lang/Object;

    const/4 v3, 0x0

    invoke-static {p5, p6}, Ljava/lang/Long;->valueOf(J)Ljava/lang/Long;

    move-result-object v4

    aput-object v4, v2, v3

    const/4 v3, 0x1

    invoke-static {p3, p4}, Ljava/lang/Long;->valueOf(J)Ljava/lang/Long;

    move-result-object v4

    aput-object v4, v2, v3

    const/4 v3, 0x2

    invoke-static {p7, p8}, Ljava/lang/Long;->valueOf(J)Ljava/lang/Long;

    move-result-object v4

    aput-object v4, v2, v3

    invoke-static {v0, v1, v2}, Lorg/apache/cordova/LOG;->d(Ljava/lang/String;Ljava/lang/String;[Ljava/lang/Object;)V

    .line 294
    iget-wide v0, p0, Lorg/apache/cordova/CordovaChromeClient;->MAX_QUOTA:J

    invoke-interface {p9, v0, v1}, Landroid/webkit/WebStorage$QuotaUpdater;->updateQuota(J)V

    .line 295
    return-void
.end method

.method public onGeolocationPermissionsShowPrompt(Ljava/lang/String;Landroid/webkit/GeolocationPermissions$Callback;)V
    .locals 2
    .parameter "origin"
    .parameter "callback"

    .prologue
    .line 328
    invoke-super {p0, p1, p2}, Landroid/webkit/WebChromeClient;->onGeolocationPermissionsShowPrompt(Ljava/lang/String;Landroid/webkit/GeolocationPermissions$Callback;)V

    .line 329
    const/4 v0, 0x1

    const/4 v1, 0x0

    invoke-interface {p2, p1, v0, v1}, Landroid/webkit/GeolocationPermissions$Callback;->invoke(Ljava/lang/String;ZZ)V

    .line 330
    return-void
.end method

.method public onHideCustomView()V
    .locals 1

    .prologue
    .line 340
    iget-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    invoke-virtual {v0}, Lorg/apache/cordova/CordovaWebView;->hideCustomView()V

    .line 341
    return-void
.end method

.method public onJsAlert(Landroid/webkit/WebView;Ljava/lang/String;Ljava/lang/String;Landroid/webkit/JsResult;)Z
    .locals 4
    .parameter "view"
    .parameter "url"
    .parameter "message"
    .parameter "result"

    .prologue
    const/4 v3, 0x1

    .line 113
    new-instance v0, Landroid/app/AlertDialog$Builder;

    iget-object v1, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v1}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v1

    invoke-direct {v0, v1}, Landroid/app/AlertDialog$Builder;-><init>(Landroid/content/Context;)V

    .line 114
    .local v0, dlg:Landroid/app/AlertDialog$Builder;
    invoke-virtual {v0, p3}, Landroid/app/AlertDialog$Builder;->setMessage(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    .line 115
    const-string v1, "Alert"

    invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setTitle(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    .line 117
    invoke-virtual {v0, v3}, Landroid/app/AlertDialog$Builder;->setCancelable(Z)Landroid/app/AlertDialog$Builder;

    .line 118
    const v1, 0x104000a

    new-instance v2, Lorg/apache/cordova/CordovaChromeClient$1;

    invoke-direct {v2, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$1;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1, v2}, Landroid/app/AlertDialog$Builder;->setPositiveButton(ILandroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;

    .line 124
    new-instance v1, Lorg/apache/cordova/CordovaChromeClient$2;

    invoke-direct {v1, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$2;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setOnCancelListener(Landroid/content/DialogInterface$OnCancelListener;)Landroid/app/AlertDialog$Builder;

    .line 130
    new-instance v1, Lorg/apache/cordova/CordovaChromeClient$3;

    invoke-direct {v1, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$3;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setOnKeyListener(Landroid/content/DialogInterface$OnKeyListener;)Landroid/app/AlertDialog$Builder;

    .line 142
    invoke-virtual {v0}, Landroid/app/AlertDialog$Builder;->show()Landroid/app/AlertDialog;

    .line 143
    return v3
.end method

.method public onJsConfirm(Landroid/webkit/WebView;Ljava/lang/String;Ljava/lang/String;Landroid/webkit/JsResult;)Z
    .locals 4
    .parameter "view"
    .parameter "url"
    .parameter "message"
    .parameter "result"

    .prologue
    const/4 v3, 0x1

    .line 156
    new-instance v0, Landroid/app/AlertDialog$Builder;

    iget-object v1, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v1}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v1

    invoke-direct {v0, v1}, Landroid/app/AlertDialog$Builder;-><init>(Landroid/content/Context;)V

    .line 157
    .local v0, dlg:Landroid/app/AlertDialog$Builder;
    invoke-virtual {v0, p3}, Landroid/app/AlertDialog$Builder;->setMessage(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    .line 158
    const-string v1, "Confirm"

    invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setTitle(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    .line 159
    invoke-virtual {v0, v3}, Landroid/app/AlertDialog$Builder;->setCancelable(Z)Landroid/app/AlertDialog$Builder;

    .line 160
    const v1, 0x104000a

    new-instance v2, Lorg/apache/cordova/CordovaChromeClient$4;

    invoke-direct {v2, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$4;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1, v2}, Landroid/app/AlertDialog$Builder;->setPositiveButton(ILandroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;

    .line 166
    const/high16 v1, 0x104

    new-instance v2, Lorg/apache/cordova/CordovaChromeClient$5;

    invoke-direct {v2, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$5;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1, v2}, Landroid/app/AlertDialog$Builder;->setNegativeButton(ILandroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;

    .line 172
    new-instance v1, Lorg/apache/cordova/CordovaChromeClient$6;

    invoke-direct {v1, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$6;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setOnCancelListener(Landroid/content/DialogInterface$OnCancelListener;)Landroid/app/AlertDialog$Builder;

    .line 178
    new-instance v1, Lorg/apache/cordova/CordovaChromeClient$7;

    invoke-direct {v1, p0, p4}, Lorg/apache/cordova/CordovaChromeClient$7;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsResult;)V

    invoke-virtual {v0, v1}, Landroid/app/AlertDialog$Builder;->setOnKeyListener(Landroid/content/DialogInterface$OnKeyListener;)Landroid/app/AlertDialog$Builder;

    .line 190
    invoke-virtual {v0}, Landroid/app/AlertDialog$Builder;->show()Landroid/app/AlertDialog;

    .line 191
    return v3
.end method

.method public onJsPrompt(Landroid/webkit/WebView;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Landroid/webkit/JsPromptResult;)Z
    .locals 13
    .parameter "view"
    .parameter "url"
    .parameter "message"
    .parameter "defaultValue"
    .parameter "result"

    .prologue
    .line 213
    const/4 v8, 0x0

    .line 214
    .local v8, reqOk:Z
    const-string v11, "file://"

    invoke-virtual {p2, v11}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v11

    if-nez v11, :cond_0

    invoke-static {p2}, Lorg/apache/cordova/Config;->isUrlWhiteListed(Ljava/lang/String;)Z

    move-result v11

    if-eqz v11, :cond_1

    .line 215
    :cond_0
    const/4 v8, 0x1

    .line 220
    :cond_1
    if-eqz v8, :cond_3

    if-eqz p4, :cond_3

    invoke-virtual/range {p4 .. p4}, Ljava/lang/String;->length()I

    move-result v11

    const/4 v12, 0x3

    if-le v11, v12, :cond_3

    const/4 v11, 0x0

    const/4 v12, 0x4

    move-object/from16 v0, p4

    invoke-virtual {v0, v11, v12}, Ljava/lang/String;->substring(II)Ljava/lang/String;

    move-result-object v11

    const-string v12, "gap:"

    invoke-virtual {v11, v12}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v11

    if-eqz v11, :cond_3

    .line 223
    :try_start_0
    new-instance v2, Lorg/json/JSONArray;

    const/4 v11, 0x4

    move-object/from16 v0, p4

    invoke-virtual {v0, v11}, Ljava/lang/String;->substring(I)Ljava/lang/String;

    move-result-object v11

    invoke-direct {v2, v11}, Lorg/json/JSONArray;-><init>(Ljava/lang/String;)V

    .line 224
    .local v2, array:Lorg/json/JSONArray;
    const/4 v11, 0x0

    invoke-virtual {v2, v11}, Lorg/json/JSONArray;->getString(I)Ljava/lang/String;

    move-result-object v10

    .line 225
    .local v10, service:Ljava/lang/String;
    const/4 v11, 0x1

    invoke-virtual {v2, v11}, Lorg/json/JSONArray;->getString(I)Ljava/lang/String;

    move-result-object v1

    .line 226
    .local v1, action:Ljava/lang/String;
    const/4 v11, 0x2

    invoke-virtual {v2, v11}, Lorg/json/JSONArray;->getString(I)Ljava/lang/String;

    move-result-object v3

    .line 227
    .local v3, callbackId:Ljava/lang/String;
    iget-object v11, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    iget-object v11, v11, Lorg/apache/cordova/CordovaWebView;->exposedJsApi:Lorg/apache/cordova/ExposedJsApi;

    move-object/from16 v0, p3

    invoke-virtual {v11, v10, v1, v3, v0}, Lorg/apache/cordova/ExposedJsApi;->exec(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v7

    .line 228
    .local v7, r:Ljava/lang/String;
    if-nez v7, :cond_2

    const-string v7, ""

    .end local v7           #r:Ljava/lang/String;
    :cond_2
    move-object/from16 v0, p5

    invoke-virtual {v0, v7}, Landroid/webkit/JsPromptResult;->confirm(Ljava/lang/String;)V
    :try_end_0
    .catch Lorg/json/JSONException; {:try_start_0 .. :try_end_0} :catch_0

    .line 283
    .end local v1           #action:Ljava/lang/String;
    .end local v2           #array:Lorg/json/JSONArray;
    .end local v3           #callbackId:Ljava/lang/String;
    .end local v10           #service:Ljava/lang/String;
    :goto_0
    const/4 v11, 0x1

    :goto_1
    return v11

    .line 229
    :catch_0
    move-exception v5

    .line 230
    .local v5, e:Lorg/json/JSONException;
    invoke-virtual {v5}, Lorg/json/JSONException;->printStackTrace()V

    .line 231
    const/4 v11, 0x0

    goto :goto_1

    .line 236
    .end local v5           #e:Lorg/json/JSONException;
    :cond_3
    if-eqz v8, :cond_4

    if-eqz p4, :cond_4

    const-string v11, "gap_bridge_mode:"

    move-object/from16 v0, p4

    invoke-virtual {v0, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v11

    if-eqz v11, :cond_4

    .line 238
    :try_start_1
    iget-object v11, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    iget-object v11, v11, Lorg/apache/cordova/CordovaWebView;->exposedJsApi:Lorg/apache/cordova/ExposedJsApi;

    invoke-static/range {p3 .. p3}, Ljava/lang/Integer;->parseInt(Ljava/lang/String;)I

    move-result v12

    invoke-virtual {v11, v12}, Lorg/apache/cordova/ExposedJsApi;->setNativeToJsBridgeMode(I)V

    .line 239
    const-string v11, ""

    move-object/from16 v0, p5

    invoke-virtual {v0, v11}, Landroid/webkit/JsPromptResult;->confirm(Ljava/lang/String;)V
    :try_end_1
    .catch Ljava/lang/NumberFormatException; {:try_start_1 .. :try_end_1} :catch_1

    goto :goto_0

    .line 240
    :catch_1
    move-exception v5

    .line 241
    .local v5, e:Ljava/lang/NumberFormatException;
    const-string v11, ""

    move-object/from16 v0, p5

    invoke-virtual {v0, v11}, Landroid/webkit/JsPromptResult;->confirm(Ljava/lang/String;)V

    .line 242
    invoke-virtual {v5}, Ljava/lang/NumberFormatException;->printStackTrace()V

    goto :goto_0

    .line 247
    .end local v5           #e:Ljava/lang/NumberFormatException;
    :cond_4
    if-eqz v8, :cond_6

    if-eqz p4, :cond_6

    const-string v11, "gap_poll:"

    move-object/from16 v0, p4

    invoke-virtual {v0, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v11

    if-eqz v11, :cond_6

    .line 248
    iget-object v11, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    iget-object v11, v11, Lorg/apache/cordova/CordovaWebView;->exposedJsApi:Lorg/apache/cordova/ExposedJsApi;

    const-string v12, "1"

    move-object/from16 v0, p3

    invoke-virtual {v12, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v12

    invoke-virtual {v11, v12}, Lorg/apache/cordova/ExposedJsApi;->retrieveJsMessages(Z)Ljava/lang/String;

    move-result-object v7

    .line 249
    .restart local v7       #r:Ljava/lang/String;
    if-nez v7, :cond_5

    const-string v7, ""

    .end local v7           #r:Ljava/lang/String;
    :cond_5
    move-object/from16 v0, p5

    invoke-virtual {v0, v7}, Landroid/webkit/JsPromptResult;->confirm(Ljava/lang/String;)V

    goto :goto_0

    .line 253
    :cond_6
    if-eqz p4, :cond_7

    const-string v11, "gap_init:"

    move-object/from16 v0, p4

    invoke-virtual {v0, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v11

    if-eqz v11, :cond_7

    .line 254
    const-string v11, "OK"

    move-object/from16 v0, p5

    invoke-virtual {v0, v11}, Landroid/webkit/JsPromptResult;->confirm(Ljava/lang/String;)V

    goto :goto_0

    .line 259
    :cond_7
    move-object/from16 v9, p5

    .line 260
    .local v9, res:Landroid/webkit/JsPromptResult;
    new-instance v4, Landroid/app/AlertDialog$Builder;

    iget-object v11, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v11}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v11

    invoke-direct {v4, v11}, Landroid/app/AlertDialog$Builder;-><init>(Landroid/content/Context;)V

    .line 261
    .local v4, dlg:Landroid/app/AlertDialog$Builder;
    move-object/from16 v0, p3

    invoke-virtual {v4, v0}, Landroid/app/AlertDialog$Builder;->setMessage(Ljava/lang/CharSequence;)Landroid/app/AlertDialog$Builder;

    .line 262
    new-instance v6, Landroid/widget/EditText;

    iget-object v11, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v11}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v11

    invoke-direct {v6, v11}, Landroid/widget/EditText;-><init>(Landroid/content/Context;)V

    .line 263
    .local v6, input:Landroid/widget/EditText;
    if-eqz p4, :cond_8

    .line 264
    move-object/from16 v0, p4

    invoke-virtual {v6, v0}, Landroid/widget/EditText;->setText(Ljava/lang/CharSequence;)V

    .line 266
    :cond_8
    invoke-virtual {v4, v6}, Landroid/app/AlertDialog$Builder;->setView(Landroid/view/View;)Landroid/app/AlertDialog$Builder;

    .line 267
    const/4 v11, 0x0

    invoke-virtual {v4, v11}, Landroid/app/AlertDialog$Builder;->setCancelable(Z)Landroid/app/AlertDialog$Builder;

    .line 268
    const v11, 0x104000a

    new-instance v12, Lorg/apache/cordova/CordovaChromeClient$8;

    invoke-direct {v12, p0, v6, v9}, Lorg/apache/cordova/CordovaChromeClient$8;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/widget/EditText;Landroid/webkit/JsPromptResult;)V

    invoke-virtual {v4, v11, v12}, Landroid/app/AlertDialog$Builder;->setPositiveButton(ILandroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;

    .line 275
    const/high16 v11, 0x104

    new-instance v12, Lorg/apache/cordova/CordovaChromeClient$9;

    invoke-direct {v12, p0, v9}, Lorg/apache/cordova/CordovaChromeClient$9;-><init>(Lorg/apache/cordova/CordovaChromeClient;Landroid/webkit/JsPromptResult;)V

    invoke-virtual {v4, v11, v12}, Landroid/app/AlertDialog$Builder;->setNegativeButton(ILandroid/content/DialogInterface$OnClickListener;)Landroid/app/AlertDialog$Builder;

    .line 281
    invoke-virtual {v4}, Landroid/app/AlertDialog$Builder;->show()Landroid/app/AlertDialog;

    goto/16 :goto_0
.end method

.method public onShowCustomView(Landroid/view/View;Landroid/webkit/WebChromeClient$CustomViewCallback;)V
    .locals 1
    .parameter "view"
    .parameter "callback"

    .prologue
    .line 335
    iget-object v0, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    invoke-virtual {v0, p1, p2}, Lorg/apache/cordova/CordovaWebView;->showCustomView(Landroid/view/View;Landroid/webkit/WebChromeClient$CustomViewCallback;)V

    .line 336
    return-void
.end method

.method public openFileChooser(Landroid/webkit/ValueCallback;)V
    .locals 1
    .parameter
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroid/webkit/ValueCallback",
            "<",
            "Landroid/net/Uri;",
            ">;)V"
        }
    .end annotation

    .prologue
    .line 373
    .local p1, uploadMsg:Landroid/webkit/ValueCallback;,"Landroid/webkit/ValueCallback<Landroid/net/Uri;>;"
    const-string v0, "*/*"

    invoke-virtual {p0, p1, v0}, Lorg/apache/cordova/CordovaChromeClient;->openFileChooser(Landroid/webkit/ValueCallback;Ljava/lang/String;)V

    .line 374
    return-void
.end method

.method public openFileChooser(Landroid/webkit/ValueCallback;Ljava/lang/String;)V
    .locals 1
    .parameter
    .parameter "acceptType"
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroid/webkit/ValueCallback",
            "<",
            "Landroid/net/Uri;",
            ">;",
            "Ljava/lang/String;",
            ")V"
        }
    .end annotation

    .prologue
    .line 377
    .local p1, uploadMsg:Landroid/webkit/ValueCallback;,"Landroid/webkit/ValueCallback<Landroid/net/Uri;>;"
    const/4 v0, 0x0

    invoke-virtual {p0, p1, p2, v0}, Lorg/apache/cordova/CordovaChromeClient;->openFileChooser(Landroid/webkit/ValueCallback;Ljava/lang/String;Ljava/lang/String;)V

    .line 378
    return-void
.end method

.method public openFileChooser(Landroid/webkit/ValueCallback;Ljava/lang/String;Ljava/lang/String;)V
    .locals 4
    .parameter
    .parameter "acceptType"
    .parameter "capture"
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroid/webkit/ValueCallback",
            "<",
            "Landroid/net/Uri;",
            ">;",
            "Ljava/lang/String;",
            "Ljava/lang/String;",
            ")V"
        }
    .end annotation

    .prologue
    .line 382
    .local p1, uploadMsg:Landroid/webkit/ValueCallback;,"Landroid/webkit/ValueCallback<Landroid/net/Uri;>;"
    iput-object p1, p0, Lorg/apache/cordova/CordovaChromeClient;->mUploadMessage:Landroid/webkit/ValueCallback;

    .line 383
    new-instance v0, Landroid/content/Intent;

    const-string v1, "android.intent.action.GET_CONTENT"

    invoke-direct {v0, v1}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    .line 384
    .local v0, i:Landroid/content/Intent;
    const-string v1, "android.intent.category.OPENABLE"

    invoke-virtual {v0, v1}, Landroid/content/Intent;->addCategory(Ljava/lang/String;)Landroid/content/Intent;

    .line 385
    const-string v1, "*/*"

    invoke-virtual {v0, v1}, Landroid/content/Intent;->setType(Ljava/lang/String;)Landroid/content/Intent;

    .line 386
    iget-object v1, p0, Lorg/apache/cordova/CordovaChromeClient;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v1}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v1

    const-string v2, "File Browser"

    invoke-static {v0, v2}, Landroid/content/Intent;->createChooser(Landroid/content/Intent;Ljava/lang/CharSequence;)Landroid/content/Intent;

    move-result-object v2

    const/16 v3, 0x1435

    invoke-virtual {v1, v2, v3}, Landroid/app/Activity;->startActivityForResult(Landroid/content/Intent;I)V

    .line 388
    return-void
.end method

.method public setWebView(Lorg/apache/cordova/CordovaWebView;)V
    .locals 0
    .parameter "view"

    .prologue
    .line 100
    iput-object p1, p0, Lorg/apache/cordova/CordovaChromeClient;->appView:Lorg/apache/cordova/CordovaWebView;

    .line 101
    return-void
.end method
