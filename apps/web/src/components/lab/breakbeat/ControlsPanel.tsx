import { useTranslations } from "next-intl";
import { DrumKitId, drumKits } from "@/lib/audio/drumKits";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/Switch";
import { Select, type SelectOption } from "@/components/ui/Select";

type ControlsPanelProps = {
  isPlaying: boolean;
  tempo: number;
  swing: number;
  humanize: boolean;
  kitId: DrumKitId;
  onTogglePlay: () => void;
  onGenerate: () => void;
  onExportMidi: () => void;
  onTempoChange: (value: number) => void;
  onSwingChange: (value: number) => void;
  onHumanizeChange: (value: boolean) => void;
  onKitChange: (value: DrumKitId) => void;
};

export default function ControlsPanel({
  isPlaying,
  tempo,
  swing,
  humanize,
  kitId,
  onTogglePlay,
  onGenerate,
  onExportMidi,
  onTempoChange,
  onSwingChange,
  onHumanizeChange,
  onKitChange,
}: ControlsPanelProps) {
  const t = useTranslations("lab.breakbeatGenerator");

  const kitOptions: SelectOption[] = drumKits.map((kit) => ({
    value: kit.id,
    label: kit.name,
    description: kit.description,
  }));

  const currentKit = drumKits.find((kit) => kit.id === kitId);

  return (
    <aside className="breakbeat-control-shell breakbeat-surface-shell ui-panel ui-frame overflow-hidden px-4 py-5 md:px-5">
      <div className="mb-4 border-b border-[var(--border-default)] pb-3">
        <p className="breakbeat-panel-kicker text-xs uppercase tracking-[0.26em]">
          Control Rack
        </p>
      </div>

      <div className="breakbeat-control-stack">
        <div className="breakbeat-control-block breakbeat-surface-raised">
          <div className="breakbeat-control-label">
            <span>Transport</span>
            <span>{isPlaying ? "RUN" : "IDLE"}</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <Button className="breakbeat-rack-button breakbeat-rack-button-primary breakbeat-surface-dark-button" onClick={onTogglePlay}>
              {isPlaying ? t("stop") : t("play")}
            </Button>
            <Button className="breakbeat-rack-button breakbeat-rack-button-secondary breakbeat-surface-raised" onClick={onGenerate}>
              {t("generatePattern")}
            </Button>
            <Button className="breakbeat-rack-button breakbeat-rack-button-tertiary breakbeat-surface-dark-button" onClick={onExportMidi}>
              {t("exportMidi")}
            </Button>
          </div>
        </div>

        <div className="breakbeat-control-block breakbeat-surface-raised">
          <div className="breakbeat-control-label">
            <span>{t("tempo")}</span>
            <span>{tempo} BPM</span>
          </div>
          <Slider
            min={80}
            max={180}
            value={tempo}
            onChange={(e) => onTempoChange(Number(e.target.value))}
            accentColor="secondary"
            className="breakbeat-slider"
          />
        </div>

        <div className="breakbeat-control-block breakbeat-surface-raised">
          <div className="breakbeat-control-label">
            <span>{t("swing")}</span>
            <span>{swing}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            value={swing}
            onChange={(e) => onSwingChange(Number(e.target.value))}
            accentColor="primary"
            className="breakbeat-slider"
          />
        </div>

        <div className="breakbeat-control-block breakbeat-surface-raised">
          <div className="breakbeat-control-label">
            <span>{t("drumKit")}</span>
            <span>{currentKit?.id ?? kitId}</span>
          </div>
          <Select
            value={kitId}
            onValueChange={(value) => onKitChange(value as DrumKitId)}
            options={kitOptions}
            className="breakbeat-select breakbeat-surface-screen"
          />
          {currentKit && (
            <p className="breakbeat-control-note">
              {currentKit.description}
            </p>
          )}
        </div>

        <div className="breakbeat-control-block breakbeat-surface-raised">
          <div className="breakbeat-control-label">
            <span>{t("humanize")}</span>
            <span>{humanize ? "ON" : "OFF"}</span>
          </div>
          <label className="breakbeat-humanize-row">
            <span className="breakbeat-humanize-copy">{t("humanize")}</span>
            <Switch
              checked={humanize}
              onCheckedChange={onHumanizeChange}
              accentColor="secondary"
              className="breakbeat-switch"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
