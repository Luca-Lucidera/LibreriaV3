<script setup lang="ts">
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { useToast } from "~/components/ui/toast";

const username = useState("signup-username", () => "");
const password = useState("signup-password", () => "");
const dateOfBirth = useState("signup-date-of-birth", () => new Date());

const { signup } = useUser();
const isLoading = useState(() => false);
const { toast } = useToast();
async function submit() {
  const result = await signup(
    username.value,
    password.value,
    dateOfBirth.value
  );
  if (!result.success) {
    toast({
      title: "Login failed",
      description: result.errorData,
      variant: "destructive",
      duration: 3000,
    });
    return;
  }
  await navigateTo("/");
}
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <Card class="w-[90%] md:w-[50%]">
      <form @submit.prevent="submit" method="post">
        <CardHeader class="text-center">
          <CardTitle>SIGNUP</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label for="username">Username</Label>
            <Input type="text" id="username" v-model="username" />
          </div>
          <div class="mt-4">
            <Label for="dateOfBirth">Date of Birth</Label>
            <br />
            <Popover>
              <PopoverTrigger as-child id="dateOfBirth">
                <Button
                  :variant="'outline'"
                  :class="
                    cn(
                      'w-[280px] justify-start text-left font-normal',
                      !dateOfBirth && 'text-muted-foreground'
                    )
                  "
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  <span>{{
                    dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"
                  }}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar v-model="dateOfBirth" />
              </PopoverContent>
            </Popover>
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
    <div class="mt-20">
      <Button variant="outline" @click="navigateTo('/login')"
        >Already Have An Account?</Button
      >
    </div>
  </div>
</template>
