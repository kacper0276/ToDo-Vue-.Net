import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export function setDocumentTitle(key: string) {
  const { t, locale } = useI18n();
  const title = ref(t(key));

  const setTitle = (newKey: string) => {
    title.value = t(newKey);
    document.title = title.value;
  };

  watch(
    [locale, () => t(key)],
    () => {
      setTitle(key);
    },
    { immediate: true }
  );

  return { title, setTitle };
}
