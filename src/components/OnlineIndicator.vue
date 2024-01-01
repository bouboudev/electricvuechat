<template>
    <span :class="{ 'online-indicator': true, 'online': online, 'offline': !online }"></span>
</template>


<script>
import { reactive, onMounted, ref, watch, computed } from "vue";
import { db } from '../firebase/index';
import { ref as firebaseRef, onValue, push, remove, update } from 'firebase/database';
import { useStore } from 'vuex';



export default {
    props: {
        userId: {
            type: String,
            required: true
        },
        connectedUsers: {
            type: Array,
            required: true
        },
        online: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const isOnline = computed(() => {
            if (props.connectedUsers && props.userId) {
                console.log('true');
                return props.connectedUsers.some(user => user.userUId === props.userId);
            }
            console.log('false');
            return false;
        });


        onMounted(() => {
            console.log('userId', props.userId);
            console.log('connectedUsers', props.connectedUsers);
        
        });
        // const computed = {
        //     isOnline() {
        //         return this.connectedUsers.some(user => user.userUId === this.userId);
        //     }
        // }

        return {
            isOnline,
        }
    }
}

</script>

<style lang="scss" scoped>

.online-indicator {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.online-indicator.online {
    background-color: green;
}

.online-indicator.offline {
    background-color: red;
}


</style>