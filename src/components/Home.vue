<template>
  <div>
    <span v-if="$store.state.data !== null">
      <v-data-table :headers="headers" :items="$store.state.data">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{props.item.id}}</td>
          <td class="text-xs-left">{{props.item.name}}</td>
          <td class="text-xs-left">{{props.item.email}}</td>
          <td class="text-xs-left">{{props.item.company.name}}</td>
        </template>
      </v-data-table>

      <div class="update-user">
        <v-select
          :items="$store.state.data"
          item-text="id"
          item-value="id"
          label="Id"
          v-model="id"
        ></v-select>
        <v-text-field
          v-model="name"
          label="Name"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="cName"
          label="Company Name"
        ></v-text-field>
        <v-btn color="#191970" :dark="true" @click="updatedUser()">UPDATE USER</v-btn>
      </div>

      <div class="updated-user" v-if="$store.state.updatedUser !== null">
          <v-data-table :headers="headersUpdated" :items="[$store.state.updatedUser]" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{props.item.name}}</td>
            <td class="text-xs-left">{{props.item.email}}</td>
            <td class="text-xs-left">{{props.item.company.name}}</td>
          </template>
        </v-data-table>
      </div>

    </span>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      email: '',
      cName: '',
      id: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email',
          align: 'left'
        },
        {
          text: 'Company',
          value: 'company',
          align: 'left'
        },
      ],
      headersUpdated: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
          sortable: false
        },
        {
          text: 'Email',
          value: 'email',
          align: 'left',
          sortable: false
        },
        {
          text: 'Company',
          value: 'company',
          align: 'left',
          sortable: false
        },
      ]
    }
  },
  mounted: function () {
    this.$store.dispatch('loadData');
  },
  methods: {
    updatedUser () {
      var user = {
        name: this.name,
        email: this.email,
        company: {
          name: this.cName,
          catchPhrase: this.$store.state.data[this.id].company.catchPhrase,
          bs: this.$store.state.data[this.id].company.bs,
        }
      }
      this.$store.dispatch('updateUser', {id: this.id, user: user});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-input {
  display: inline-block;
  margin: 10px;
}
.updated-user {
  width: 40%;
  margin: 10px;
}
</style>
