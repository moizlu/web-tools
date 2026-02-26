<script lang="ts">
    import favicon from "$lib/assets/favicon.svg"
    import JumpIcon from "$lib/assets/icons/jump.svelte";
    import MailIcon from "$lib/assets/icons/mail.svelte";
    import GitHubLight from "$lib/assets/icons/light/github.svg";
    import GitHubDark from "$lib/assets/icons/dark/github.svg";

    import Icon from "$lib/components/ui/Icon";
    import SvgIcon from "$lib/components/ui/SvgIcon";
</script>

<footer class="fixed bottom-0 left-0 w-full h-12.5 z-1000 backdrop-blur-sm flex justify-between items-center px-3">
    <a href="https://moiz.lu/" title="制作者のサイト" target="_blank" class="flex-center gap-2">
        <img src={favicon} alt="logo" width={30} height={30}>
        <p>開発者: もいずる</p>
        <SvgIcon Svg={JumpIcon} size={20} />
    </a>

    <div class="flex-center gap-2">
        <a href="https://moiz.lu/gh/portfolio-tools" title="GitHubリポジトリ" target="_blank">
            <Icon lightSrc={GitHubLight} darkSrc={GitHubDark} size={30} />
        </a>
        <a href="https://moiz.lu/contact" title="お問い合わせ" target="_blank">
            <SvgIcon Svg={MailIcon} size={30} />
        </a>
    </div>
</footer>
