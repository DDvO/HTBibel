.class Lorg/apache/cordova/CordovaActivity$4$1;
.super Ljava/lang/Object;
.source "CordovaActivity.java"

# interfaces
.implements Landroid/content/DialogInterface$OnClickListener;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lorg/apache/cordova/CordovaActivity$4;->run()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic this$1:Lorg/apache/cordova/CordovaActivity$4;


# direct methods
.method constructor <init>(Lorg/apache/cordova/CordovaActivity$4;)V
    .locals 0
    .parameter

    .prologue
    .line 961
    iput-object p1, p0, Lorg/apache/cordova/CordovaActivity$4$1;->this$1:Lorg/apache/cordova/CordovaActivity$4;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public onClick(Landroid/content/DialogInterface;I)V
    .locals 1
    .parameter "dialog"
    .parameter "which"

    .prologue
    .line 963
    invoke-interface {p1}, Landroid/content/DialogInterface;->dismiss()V

    .line 964
    iget-object v0, p0, Lorg/apache/cordova/CordovaActivity$4$1;->this$1:Lorg/apache/cordova/CordovaActivity$4;

    iget-boolean v0, v0, Lorg/apache/cordova/CordovaActivity$4;->val$exit:Z

    if-eqz v0, :cond_0

    .line 965
    iget-object v0, p0, Lorg/apache/cordova/CordovaActivity$4$1;->this$1:Lorg/apache/cordova/CordovaActivity$4;

    iget-object v0, v0, Lorg/apache/cordova/CordovaActivity$4;->val$me:Lorg/apache/cordova/CordovaActivity;

    invoke-virtual {v0}, Lorg/apache/cordova/CordovaActivity;->endActivity()V

    .line 967
    :cond_0
    return-void
.end method
