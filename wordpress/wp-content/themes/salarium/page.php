<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
<body class="bg-light-grey">

    <?php while (have_posts()) : the_post(); ?>
        <main class="max-w-2xl mx-auto p-4">
            <?php the_content(); ?>
        </main>
    <?php endwhile; ?>

    <?php wp_footer(); ?>
</body>
</html>
