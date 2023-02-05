<template>
  <div class="flex items-center justify-center bg-black h-screen">
    <Button
      @click="googleSignIn"
    >
      Login via Google
    </Button>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/elements/Button.vue";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const provider = new GoogleAuthProvider();
const auth = getAuth();

const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then(() => router.push('/'))
    .catch(console.error);
};
</script>