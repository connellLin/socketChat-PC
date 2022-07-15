<script setup lang="ts">
import ChatNav from "./ChatNav.vue";
import ChatDomain from "./ChatDomain.vue";
import ChatContent from "./ChatContent.vue";
import { userList } from "../api/user.js";
import io from "socket.io-client";
import { useMainStore } from "../store/main";
const store = useMainStore();
import Conversition from "../class/Conversition";
import { onMounted, getCurrentInstance } from "vue";
const { proxy }: any = getCurrentInstance();

const chatUrl: any = import.meta.env.VITE_BASE_API || "/";

onMounted(() => {
  init();
});

async function init() {
  if (proxy.$commom.isLogin()) {
    initSocket();
    if (store.allSessionList.length == 0) getUserList();
  } else {
    proxy.$router.replace({
      name: "Home",
    });
  }
}

// 匹配地址栏参数
function GetQueryString(name: string) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 获取用户列表
function getUserList() {
  let query = {
    id: store.sender?.Id,
  };
  userList(query).then((res: any) => {
    if (res?.code == 200) {
      store.allSessionList = res?.data;
    } else {
      proxy.$message.error(res?.message);
    }
  });
}

function initSocket() {
  store.socket = io(chatUrl);
  store.socket.on("connect", () => {
    console.log("连接成功");
    store.socket.emit("joinChat", {
      SendId: store.sender.Id,
      SendName: store.sender.Name,
      ReviceId: -1,
      ReviceName: "",
      NoCode: store.noCode,
    });
  });
  store.socket.on("disconnect", () => {
    console.log("连接已断开");
  });
  //修改信息状态
  store.socket.on("changMsgState", (data: any) => {
    store.conversitionList.map((x: Conversition) => {
      if (x.NoCode != null && x.NoCode == data.NoCode) {
        x.State = 1;
      }
    });
  });
  // 加入会话成功
  store.socket.on("joinSuccess", (data: any) => {
    store.sender.OnlineState = true;
    store.conversitionList = data.conversition;

    if (store.sessionList.length == 0) {
      store.sessionList = data.historySessionList;
    }
  });
  //接收信息
  store.socket.on("reviceMsg", (data: Conversition) => {
    if (data.ReciverId == store.sender.Id) {
      store.playMusic();
      if (window.Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
          var n = new Notification("HasChat消息通知", {
            body: "你有一条新的消息",
          });
        });
      }
      for (let item of store.sessionList) {
        if (item.Id == data.SendId && store.sessionSelectId == data.SendId) {
          data.ReadFlag = true;
          let query = {
            SendId: data.SendId,
            ReciverId: store.sender.Id,
          };
          store.socket.emit("changeMsgRead", query);
          break;
        }
      }
    }
    store.sendLocal(data);
    let len =
      store.sessionList.filter((x: any) => x.Id == data.SendId)?.length ?? 0;
    if (len === 0) {
      let item = store.allSessionList.filter((x: any) => x.Id == data.SendId);
      store.sessionList.push(...item);
    }
    store.toBottom();
  });
  //多设备在线时，强制旧设备下线
  store.socket.on("squeezeOut", (data: any) => {
    if (data.noCode == store.noCode) {
      store.logout();
      alert("账户在其他地方登陆，会话已断开");
      proxy.$router.replace({
        name: "Home",
      });
    }
  });
}
</script>

<template>
  <div class="chat">
    <chat-nav />
    <chat-domain />
    <chat-content />
  </div>
</template>

<style scoped lang="less">
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 33px;
}
</style>
