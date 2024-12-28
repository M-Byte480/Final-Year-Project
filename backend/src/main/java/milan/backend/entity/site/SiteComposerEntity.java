/*
 * Citation: This file was generated with the help of GitHub Copilot 2024
 */

package milan.backend.entity.site;

import jakarta.persistence.*;

import java.util.UUID;


@Entity
@Table(name = "site_composer_autosave_states")
@SecondaryTables({
        @SecondaryTable(name = "site_composer_saved_states")
})
public class SiteComposerEntity {
    @Id
    private UUID id;
}
