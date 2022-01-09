<template>
  <v-app style="-webkit-app-region: drag" v-if='isData'>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      color="#000c36"
      dark
      app
      mini-variant.sync="false"
    >
      <v-list-item class="px-2 pt-1">
        <v-list-item-avatar>
          <v-img :src="user.avatar" alt="admin" class="mx-auto" />
        </v-list-item-avatar>
        <v-list-item-content class="ml-2">
          <v-list-item-title class="text-capitalize">{{user.first_name}} {{user.last_name}}</v-list-item-title>
          <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>
      <v-list nav shaped class="clickable">
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item['icon-ctr']"
            :append-icon="item.model ? item.icon : item['icon-alt']"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              route
              :to="child.route"
              active-class="indigo darken-4--text"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            active-class="#003655"
            route
            :to="item.route"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="#000c36" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{this.$route.name}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click="logout" class="clickable">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container 
        class="scroll-y" 
        fluid
        >
        <v-row align="center" justify="center">
          <router-view> </router-view>
        </v-row>
      </v-container>
    </v-main>
    <v-btn
      v-scroll="onScroll"
      bottom
      color="#000c36"
      dark
      fab
      fixed
      right
      @click="toTop"
      class="clickable"
    ><v-icon>mdi-chevron-up</v-icon></v-btn>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    fab: false,
    items: [
      { icon: "mdi-home", text: "Dashboard", route: "/" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        "icon-ctr": "mdi-map-marker",
        text: "MyBlogs",
        model: false,
        children: [
          { icon: "mdi-tooltip-account", text: "Itunes", route: "/itunes" },
          { icon: "mdi-printer", text: "Youtube", route: "/youtube" },
        ],
      },
      { icon: "mdi-finance", text: "Revenue", route: "/revenue" },
    ],
  }),
  computed:{
    ...mapState({
      user: state => state.profile.data,
      isData: state => state.isData,
    }),
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    ...mapActions(['getUserProfile']),

    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop() {
      this.$vuetify.goTo(0)
    },
    logout() {
      console.log('Logout');
      console.log(this.isData);
    }
  },
};
</script>

<style>

.theme--dark.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  display: none;
}

.v-application .indigo {
    background-color: #16132c !important;
}

.v-list-item__title,
.v-toolbar__title {
  font-family: 'Titillium Web', sans-serif;
}

.v-card {
  border-radius: 10px !important;
}

.clickable {
  -webkit-app-region: no-drag;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 4, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 4, 255, 0.5);
  border-radius: 10px;
}
</style>
