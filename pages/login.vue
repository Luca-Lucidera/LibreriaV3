<script setup lang="ts">
import { useToast } from "~/components/ui/toast/use-toast";

const { login } = useUser();
const { toast } = useToast();

const username = useState("login-username", () => "");
const password = useState("login-password", () => "");
const isLoading = useState(() => false);

async function submit() {
  isLoading.value = true;
  const result = await login(username.value, password.value);
  isLoading.value = false;
  if (!result.success) {
    toast({
      title: "Login failed",
      description: result.errorData,
      variant: "destructive",
      duration: 3000,
    });
    return;
  }
}
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <Card class="w-[90%] md:w-[50%]">
      <form @submit.prevent="submit" method="post">
        <CardHeader class="text-center">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label for="username">Username</Label>
            <Input type="text" id="username" v-model="username" />
          </div>
          <div class="mt-4">
            <Label for="password">Password</Label>
            <Input type="password" id="password" v-model="password" />
          </div>
        </CardContent>
        <CardFooter class="mt-2 justify-center">
          <Button type="submit" :disabled="isLoading">Login</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>
