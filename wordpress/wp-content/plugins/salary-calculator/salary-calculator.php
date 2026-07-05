<?php
/**
 * Plugin Name: Salarium - Calculateur de salaire
 * Description: Affiche un calculateur brut/net via le shortcode [salary_calculator].
 * Version: 1.0
 * Author: Mathieu Bourasseau
 */

add_shortcode('salary_calculator', 'salarium_render_calculator');

function salarium_render_calculator() {
    ob_start();

    // Only execute if the form is submitted
    if (isset($_POST['gross_salary'])) {
        $gross_salary = $_POST['gross_salary'];
        $contribution_rate = $_POST['contribution_rate'];

        // Check if form data are valid
        if (empty($gross_salary) || empty($contribution_rate)) {
            echo "Erreur : veuillez remplir tous les champs.";
        } elseif (!is_numeric($gross_salary) || !is_numeric($contribution_rate)) {
            echo "Erreur : veuillez remplir les champs avec des chiffres.";
        } elseif ($gross_salary <= 0 || $contribution_rate <= 0) {
            echo "Erreur : les valeurs doivent être supérieures à zéro.";
        } else {
            $net_salary = $gross_salary * (1 - $contribution_rate/100);
            echo "Salaire net :" . $net_salary "€";
        }
    }
    ?>
    <form method="post">
        <label for="gross-salary">Salaire brut mensuel (€)</label>
        <input type="text" name="gross_salary" id="gross-salary">

        <label for="contribution-rate">Taux de charges (%)</label>
        <input type="text" name="contribution_rate" id="contribution-rate">

        <button type="submit">Calculer</button>
    </form>
    <?php
    return ob_get_clean();
}
