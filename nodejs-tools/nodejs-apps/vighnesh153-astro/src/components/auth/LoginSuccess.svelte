<script lang="ts">
  import { onSuccessRedirectPathKey } from '@/utils';
  import { onMount } from 'svelte';

  onMount(() => {
    const redirectPath = localStorage.getItem(onSuccessRedirectPathKey) ?? '/';
    localStorage.removeItem(onSuccessRedirectPathKey);
    window.location.replace(redirectPath);
  });
</script>

<p>Redirecting...</p>
